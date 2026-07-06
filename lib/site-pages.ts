import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

// Content overrides edited in /admin/site-pages (the `site_pages` table).
// Every field is optional: public pages render their built-in content
// unless the admin has saved a non-empty override for that field.

export interface SitePageContent {
  hero?: { title?: string; subtitle?: string; description?: string };
  cta?: { title?: string; description?: string };
  story?: { title?: string; content?: string };
  values?: { title: string; description: string; icon?: string }[];
  certifications?: { title: string; description: string }[];
  serviceAreas?: string[];
  contactInfo?: {
    phone?: string;
    fax?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  seo?: { title?: string; description?: string };
  [key: string]: unknown;
}

// Admin editor slugs: about, contact, gallery, blog, areas-we-serve, gary-m-bonelli
export const getSitePage = cache(async (slug: string): Promise<SitePageContent> => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_pages")
      .select("content")
      .eq("slug", slug)
      .maybeSingle();
    return (data?.content as SitePageContent) ?? {};
  } catch {
    return {};
  }
});

// Use the admin-saved string when present and non-empty, else the built-in default.
export function orDefault(value: string | undefined, fallback: string): string {
  return value && value.trim() !== "" ? value : fallback;
}
