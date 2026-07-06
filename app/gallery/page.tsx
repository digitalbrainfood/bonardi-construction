import type { Metadata } from "next";
import { galleryImages, galleryTitles } from "@/lib/images";
import { createPublicClient } from "@/lib/supabase/public";
import { getSitePage } from "@/lib/site-pages";
import GalleryClient, { type GalleryProject } from "@/components/GalleryClient";

// SEO for this route lives in app/gallery/layout.tsx (title, description,
// canonical, OpenGraph, JSON-LD) and continues to apply to this page.
// generateMetadata below only overrides title/description when the admin
// has saved non-empty SEO values in /admin/site-pages.

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSitePage("gallery");
  const meta: Metadata = {};
  if (content.seo?.title?.trim()) meta.title = content.seo.title;
  if (content.seo?.description?.trim()) meta.description = content.seo.description;
  return meta;
}

// Pass admin-saved strings through as props, undefined when empty so the
// client component falls back to its built-in copy.
function nonEmpty(value: string | undefined): string | undefined {
  return value && value.trim() !== "" ? value : undefined;
}

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
  const content = await getSitePage("gallery");

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

  return (
    <GalleryClient
      projects={projects}
      categories={categories}
      heroTitle={nonEmpty(content.hero?.title)}
      heroDescription={nonEmpty(content.hero?.description)}
      ctaTitle={nonEmpty(content.cta?.title)}
      ctaDescription={nonEmpty(content.cta?.description)}
    />
  );
}
