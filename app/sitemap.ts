import { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { areas } from "@/lib/areas-data";
import { getAllPosts } from "@/lib/blog";
import { createPublicClient } from "@/lib/supabase/public";

async function getPublishedDynamicPages(): Promise<{ slug: string; updated_at: string | null }[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("pages")
      .select("slug,updated_at")
      .eq("status", "published");
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://bonardiconst.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gary-m-bonelli`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/thank-you`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/areas-we-serve`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/asphalt/sealcoating`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: `${base}/areas-we-serve/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const dynamicPages = await getPublishedDynamicPages();
  const dynamicRoutes: MetadataRoute.Sitemap = dynamicPages.map((page) => ({
    url: `${base}/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...blogRoutes, ...dynamicRoutes];
}
