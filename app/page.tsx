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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
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
      <SectionDivider variant="wave" />
      <Services />
      <SectionDivider variant="dots" />
      <WhyUs />
      <Testimonials />
      <SectionDivider variant="wave" flip />
      <ServiceAreas />
      <ContactCTA />
    </>
  );
}
