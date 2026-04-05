import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Bonardi Construction for a free quote. Call 718.762.3400 or submit a request online. Licensed general contractor serving Queens, Brooklyn, Nassau & Suffolk County.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Bonardi Construction — Free Quote",
    description:
      "Call 718.762.3400 or request a free quote online. Licensed general contractor serving Queens, Brooklyn, Nassau & Suffolk County.",
    url: "https://bonardiconst.com/contact-us",
    siteName: "Bonardi Construction",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Bonardi Construction",
    url: "https://bonardiconst.com/contact-us",
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": "https://bonardiconst.com/#organization",
      name: "Bonardi Construction, Inc.",
      telephone: "+1-718-762-3400",
      faxNumber: "+1-718-762-8606",
      email: "Info@bonardiconst.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Queens",
        addressRegion: "NY",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "07:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "14:00",
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact Us", url: "/contact-us" },
        ])}
      />
      {children}
    </>
  );
}
