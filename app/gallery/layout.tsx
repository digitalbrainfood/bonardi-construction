import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse completed construction projects by Bonardi Construction — asphalt, concrete, masonry, roofing, new construction, hardscaping, and restoration across Queens, Brooklyn, and Long Island.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Project Gallery — Bonardi Construction",
    description:
      "Browse completed construction projects across Queens, Brooklyn, Nassau & Suffolk County.",
    url: "https://bonardiconst.com/gallery",
    siteName: "Bonardi Construction",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Bonardi Construction Project Gallery",
    description:
      "Photos of completed construction projects by Bonardi Construction across Queens, Brooklyn, and Long Island.",
    url: "https://bonardiconst.com/gallery",
    publisher: {
      "@type": "LocalBusiness",
      "@id": "https://bonardiconst.com/#organization",
      name: "Bonardi Construction, Inc.",
    },
  };

  return (
    <>
      <JsonLd data={gallerySchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />
      {children}
    </>
  );
}
