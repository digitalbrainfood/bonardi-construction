const SITE_URL = "https://bonardiconst.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${SITE_URL}/#organization`,
    name: "Bonardi Construction, Inc.",
    url: SITE_URL,
    telephone: "+1-718-762-3400",
    faxNumber: "+1-718-762-8606",
    email: "Info@bonardiconst.com",
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
    sameAs: [
      "https://www.facebook.com/Bonardiconstruction/",
      "https://www.instagram.com/bonardiconstruction/",
    ],
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
        identifier: "#1274180",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Home Improvement Contractor License",
        recognizedBy: {
          "@type": "Organization",
          name: "Nassau County",
        },
        identifier: "#H0446880000",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Home Improvement Contractor License",
        recognizedBy: {
          "@type": "Organization",
          name: "Suffolk County",
        },
        identifier: "#57853-H",
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
      name: "Bonardi Construction, Inc.",
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
