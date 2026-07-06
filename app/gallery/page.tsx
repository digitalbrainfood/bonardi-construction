import { galleryImages, galleryTitles } from "@/lib/images";
import { createPublicClient } from "@/lib/supabase/public";
import GalleryClient, { type GalleryProject } from "@/components/GalleryClient";

// SEO for this route lives in app/gallery/layout.tsx (title, description,
// canonical, OpenGraph, JSON-LD) and continues to apply to this page.

export const revalidate = 300;

interface GalleryRow {
  id: string;
  title: string | null;
  url: string | null;
  category: string | null;
  created_at: string | null;
}

// Fetch admin-uploaded gallery rows. The Supabase project may be unreachable
// (paused/DNS dead) — on any error or timeout, silently fall back to the
// static photo list so the public gallery always renders.
async function fetchDbProjects(): Promise<GalleryProject[]> {
  try {
    const supabase = createPublicClient();
    const result = await Promise.race([
      supabase
        .from("gallery")
        .select("id, title, url, category, created_at")
        .order("created_at", { ascending: false }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
    ]);
    if (!result || result.error || !result.data) return [];

    return (result.data as GalleryRow[])
      .filter((row): row is GalleryRow & { url: string } => Boolean(row.url))
      .map((row, i) => {
        const category = row.category ?? "Commercial Projects";
        return {
          id: "db-" + row.id,
          category,
          src: row.url,
          title: row.title ?? (galleryTitles[category] ?? category),
          tall: i % 3 === 1,
        };
      });
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const staticProjects: GalleryProject[] = Object.entries(galleryImages).flatMap(
    ([category, images]) =>
      images.map((src, i) => ({
        id: category + i,
        category,
        src,
        title: `${galleryTitles[category] ?? category} — ${String(i + 1).padStart(2, "0")}`,
        tall: i % 3 === 1,
      }))
  );

  const dbProjects = await fetchDbProjects();
  const projects = [...dbProjects, ...staticProjects];

  const staticCategories = Object.keys(galleryImages);
  const extraCategories = Array.from(
    new Set(
      dbProjects
        .map((p) => p.category)
        .filter((c) => !staticCategories.includes(c))
    )
  );
  const categories = ["All", ...staticCategories, ...extraCategories];

  return <GalleryClient projects={projects} categories={categories} />;
}
