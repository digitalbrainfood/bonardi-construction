import { defaultSettings } from "@/lib/settings";

const SITE_URL = "https://www.bonardiconst.com";

// Format a 10-digit US number as +1-XXX-XXX-XXXX for schema.org output.
function schemaPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10
    ? `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    : `+1-${digits}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${SITE_URL}/#organization`,
    name: defaultSettings.companyName,
    url: SITE_URL,
    telephone: schemaPhone(defaultSettings.phone),
    faxNumber: schemaPhone(defaultSettings.fax),
    email: defaultSettings.email,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Licensed general contractor serving Queens, Brooklyn, Nassau County, Suffolk County, and Long Island with 30+ years of residential and commercial construction experience.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Queens",
      addressRegion: "NY",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7282,
      longitude: -73.7949,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Queens",
        containedInPlace: { "@type": "State", name: "New York" },
      },
      {
        "@type": "City",
        name: "Brooklyn",
        containedInPlace: { "@type": "State", name: "New York" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Nassau County",
        containedInPlace: { "@type": "State", name: "New York" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Suffolk County",
        containedInPlace: { "@type": "State", name: "New York" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Long Island",
        containedInPlace: { "@type": "State", name: "New York" },
      },
    ],
    founder: {
      "@type": "Person",
      name: "Gary M. Bonelli",
      jobTitle: "Owner & Principal Contractor",
      url: `${SITE_URL}/gary-m-bonelli`,
    },
    sameAs: [defaultSettings.facebook, defaultSettings.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "General Contractor License",
        recognizedBy: {
          "@type": "Organization",
          name: "New York City",
        },
        identifier: defaultSettings.licenseNYC,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Home Improvement Contractor License",
        recognizedBy: {
          "@type": "Organization",
          name: "Nassau County",
        },
        identifier: defaultSettings.licenseNassau,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Home Improvement Contractor License",
        recognizedBy: {
          "@type": "Organization",
          name: "Suffolk County",
        },
        identifier: defaultSettings.licenseSuffolk,
      },
    ],
    priceRange: "$$",
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: defaultSettings.companyName,
    },
    areaServed: [
      { "@type": "City", name: "Queens" },
      { "@type": "City", name: "Brooklyn" },
      { "@type": "AdministrativeArea", name: "Nassau County" },
      { "@type": "AdministrativeArea", name: "Suffolk County" },
      { "@type": "AdministrativeArea", name: "Long Island" },
    ],
  };
}
