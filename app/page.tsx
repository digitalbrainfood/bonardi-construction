import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import ServiceAreas from "@/components/ServiceAreas";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <ServiceAreas />
      <ContactCTA />
    </>
  );
}
