import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import ServiceAreas from "@/components/ServiceAreas";
import ContactCTA from "@/components/ContactCTA";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import SectionDivider from "@/components/SectionDivider";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";
import { createPublicClient } from "@/lib/supabase/public";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const revalidate = 300;

async function getReviewItems() {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("reviews")
      .select("name,location,rating,text,service")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(9);
    return (data ?? []).map((r) => ({
      quote: r.text as string,
      name: r.name as string,
      projectType: (r.service as string) ?? "",
      location: (r.location as string) ?? "",
      rating: (r.rating as number) ?? 5,
    }));
  } catch {
    return []; // Testimonials falls back to its built-in list
  }
}

export default async function Home() {
  const reviewItems = await getReviewItems();
  const org = organizationSchema();
  const homeSchema = {
    ...org,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        "Asphalt Services",
        "Concrete, Blacktop & Striping",
        "Roofing Services",
        "Masonry, Brick Pointing & Weatherproofing",
        "New Construction",
        "Home Additions & Extensions",
        "Foundation Repair & Restoration",
        "Fire Damage Restoration",
        "Water & Mold Restoration",
        "Waterproofing",
        "Hardscaping",
        "Demolition",
        "Drainage Solutions",
        "Excavation",
        "Construction Management",
        "Office Buildouts",
        "Framing",
        "Flooring",
        "Generac Generators",
        "Sidewalk Repairs",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={homeSchema} />
      <Hero />
      <TrustBadges />
      <Stats />
      <Services />
      <SectionDivider variant="dots" />
      <WhyUs />
      <Testimonials items={reviewItems} />
      <ServiceAreas />
      <ContactCTA />
    </>
  );
}
