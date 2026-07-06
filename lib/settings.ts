import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";

// Site-wide settings edited in /admin/settings (the `settings` table).
// The defaults below are the site's real, current values — they are what
// renders when the database is unreachable or nothing has been saved yet.

export interface SiteSettings {
  companyName: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  licenseNYC: string;
  licenseNassau: string;
  licenseSuffolk: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ogImage: string;
}

export const defaultSettings: SiteSettings = {
  companyName: "Bonardi Construction, Inc.",
  phone: "718.762.3400",
  fax: "718.762.8606",
  email: "Info@bonardiconst.com",
  address: "Queens, NY",
  facebook: "https://www.facebook.com/Bonardiconstruction/",
  instagram: "https://www.instagram.com/bonardiconstruction/",
  hoursWeekday: "Mon–Fri: 7:00 AM – 6:00 PM",
  hoursSaturday: "Sat: 8:00 AM – 2:00 PM",
  hoursSunday: "Sun: Closed",
  licenseNYC: "#1274180",
  licenseNassau: "#H0446880000",
  licenseSuffolk: "#57853-H",
  defaultMetaTitle: "Bonardi Construction | General Contracting — Queens, NY",
  defaultMetaDescription:
    "Bonardi Construction, Inc. — 30 years of expert general contracting across Queens, Brooklyn, Nassau & Suffolk County. Residential, commercial, asphalt, masonry, roofing & more.",
  ogImage: "",
};

// Merge saved settings over defaults; empty strings in the DB don't erase defaults.
function mergeSettings(saved: Partial<SiteSettings> | null | undefined): SiteSettings {
  const merged = { ...defaultSettings };
  if (saved) {
    for (const key of Object.keys(defaultSettings) as (keyof SiteSettings)[]) {
      const v = saved[key];
      if (typeof v === "string" && v.trim() !== "") merged[key] = v;
    }
  }
  return merged;
}

// Cached per request. Falls back to defaults when the DB is unreachable.
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("settings")
      .select("data")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return mergeSettings(data?.data as Partial<SiteSettings> | undefined);
  } catch {
    return defaultSettings;
  }
});
