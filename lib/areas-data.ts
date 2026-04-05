export type AreaData = {
  slug: string;
  name: string;
  county: string;
  description: string;
};

export const areas: AreaData[] = [
  {
    slug: "whitestone-ny",
    name: "Whitestone, NY",
    county: "Queens",
    description:
      "Bonardi Construction provides expert general contracting services in Whitestone, Queens. From asphalt paving and masonry restoration to new construction and home additions, our licensed team delivers quality results for Whitestone homeowners and businesses.",
  },
  {
    slug: "little-neck-ny",
    name: "Little Neck, NY",
    county: "Queens",
    description:
      "Serving the Little Neck community with 30+ years of construction expertise. We handle residential renovations, foundation repair, roofing, hardscaping, and commercial projects throughout this established Queens neighborhood.",
  },
  {
    slug: "flushing-ny",
    name: "Flushing, NY",
    county: "Queens",
    description:
      "Bonardi Construction is a trusted general contractor serving Flushing, Queens. Our services include concrete work, sidewalk repairs, waterproofing, demolition, and full-scale residential and commercial construction.",
  },
  {
    slug: "bayside-ny",
    name: "Bayside, NY",
    county: "Queens",
    description:
      "From home additions to commercial buildouts, Bonardi Construction delivers reliable general contracting services in Bayside, Queens. Licensed, bonded, and backed by decades of local experience.",
  },
  {
    slug: "bay-terrace-ny",
    name: "Bay Terrace, NY",
    county: "Queens",
    description:
      "Bonardi Construction serves Bay Terrace with comprehensive construction services including roofing, masonry, foundation repair, and drainage solutions. Quality craftsmanship for this waterfront Queens community.",
  },
  {
    slug: "astoria-ny",
    name: "Astoria, NY",
    county: "Queens",
    description:
      "As one of Queens' most dynamic neighborhoods, Astoria demands contractors who understand both historic preservation and modern builds. Bonardi Construction handles everything from brownstone restoration to new construction in Astoria.",
  },
  {
    slug: "auburndale-ny",
    name: "Auburndale, NY",
    county: "Queens",
    description:
      "Bonardi Construction provides residential and commercial contracting in Auburndale, Queens. Our licensed crews handle roofing, siding, concrete, masonry, and home additions with precision and care.",
  },
  {
    slug: "college-point-ny",
    name: "College Point, NY",
    county: "Queens",
    description:
      "Serving College Point with expert general contracting services. From asphalt paving and excavation to fire damage restoration and waterproofing, Bonardi Construction is your trusted local contractor.",
  },
  {
    slug: "murray-hill-ny",
    name: "Murray Hill, NY",
    county: "Queens",
    description:
      "Bonardi Construction provides full-service general contracting in Murray Hill, Queens. Specializing in residential renovations, new construction, foundation repair, and hardscaping for this charming neighborhood.",
  },
  {
    slug: "oakland-gardens-ny",
    name: "Oakland Gardens, NY",
    county: "Queens",
    description:
      "Expert construction services in Oakland Gardens, Queens. Bonardi Construction handles home additions, roofing, concrete work, drainage solutions, and more for Oakland Gardens residents and businesses.",
  },
  {
    slug: "fresh-meadows-ny",
    name: "Fresh Meadows, NY",
    county: "Queens",
    description:
      "Bonardi Construction serves Fresh Meadows with 30+ years of general contracting expertise. From kitchen and bathroom remodeling to masonry restoration and commercial buildouts, we deliver quality results.",
  },
  {
    slug: "north-hempstead-ny",
    name: "North Hempstead, NY",
    county: "Nassau County",
    description:
      "Bonardi Construction extends our expert general contracting services to North Hempstead in Nassau County. We handle residential and commercial projects including new construction, hardscaping, asphalt paving, and structural repairs.",
  },
  {
    slug: "franklin-square-ny",
    name: "Franklin Square, NY",
    county: "Nassau County",
    description:
      "Serving Franklin Square, Nassau County with comprehensive construction solutions. Bonardi Construction provides asphalt, concrete, roofing, masonry, and renovation services backed by decades of Long Island experience.",
  },
  {
    slug: "plandome-ny",
    name: "Plandome, NY",
    county: "Nassau County",
    description:
      "Bonardi Construction serves the Plandome community in Nassau County with premium construction services. From custom home builds to hardscaping and foundation repair, we deliver results that match this community's high standards.",
  },
  {
    slug: "douglaston-ny",
    name: "Douglaston, NY",
    county: "Queens",
    description:
      "Bonardi Construction is a trusted general contractor in Douglaston, Queens. We provide comprehensive services including new construction, home additions, roofing, masonry, and waterproofing for this historic neighborhood.",
  },
];

export function getAreaBySlug(slug: string): AreaData | undefined {
  return areas.find((a) => a.slug === slug);
}
