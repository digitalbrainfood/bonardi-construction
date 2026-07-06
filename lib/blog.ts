import { createPublicClient } from "@/lib/supabase/public";
import { posts as staticPosts, type BlogPost } from "@/lib/blog-data";

// Blog data access: merges posts created in the admin (the `blogs` table)
// with the built-in static posts. Database posts win on slug conflicts, and
// everything degrades to the static list if the database is unreachable.

interface BlogRow {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadTime(html: string | null): string {
  const words = (html ?? "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

function rowToPost(row: BlogRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "Construction Tips",
    date: formatDate(row.published_at ?? row.created_at),
    readTime: estimateReadTime(row.content),
    image: row.featured_image || "/images/web/hero/hero-2.jpg",
    content: row.content ?? "",
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("slug,title,excerpt,content,featured_image,category,published_at,created_at")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });
    if (error || !data) return staticPosts;
    const dbPosts = (data as BlogRow[]).map(rowToPost);
    const dbSlugs = new Set(dbPosts.map((p) => p.slug));
    return [...dbPosts, ...staticPosts.filter((p) => !dbSlugs.has(p.slug))];
  } catch {
    return staticPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("blogs")
      .select("slug,title,excerpt,content,featured_image,category,published_at,created_at")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (data) return rowToPost(data as BlogRow);
  } catch {
    // fall through to static
  }
  return staticPosts.find((p) => p.slug === slug) ?? null;
}

export function getRelatedFrom(
  all: BlogPost[],
  currentSlug: string,
  category: string,
  limit: number
): BlogPost[] {
  const sameCategory = all.filter((p) => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = all.filter((p) => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
