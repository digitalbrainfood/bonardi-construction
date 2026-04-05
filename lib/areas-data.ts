export type AreaData = {
  slug: string;
  name: string;
  county: string;
  description: string;
  faqs?: { question: string; answer: string }[];
};

export const areas: AreaData[] = [
  {
    slug: "whitestone-ny",
    name: "Whitestone, NY",
    county: "Queens",
    description:
      "Bonardi Construction provides expert general contracting services in Whitestone, Queens. From asphalt paving and masonry restoration to new construction and home additions, our licensed team delivers quality results for Whitestone homeowners and businesses.",
    faqs: [
      {
        question: "Do I need a permit for construction in Whitestone?",
        answer:
          "Yes, most construction projects in Whitestone require permits from the NYC Department of Buildings, including home additions, structural alterations, and new construction. Bonardi Construction handles all permit filings and inspections as part of our service.",
      },
      {
        question: "What construction services are most popular in Whitestone?",
        answer:
          "Whitestone homeowners most commonly request home additions, dormer builds, driveway paving, masonry repair, and roofing services. As a full-service general contractor, Bonardi Construction handles all of these and more throughout the Whitestone community.",
      },
    ],
  },
  {
    slug: "little-neck-ny",
    name: "Little Neck, NY",
    county: "Queens",
    description:
      "Serving the Little Neck community with 30+ years of construction expertise. We handle residential renovations, foundation repair, roofing, hardscaping, and commercial projects throughout this established Queens neighborhood.",
    faqs: [
      {
        question: "How do I find a licensed contractor in Little Neck?",
        answer:
          "Look for a contractor with active NYC Department of Buildings and Nassau County licenses, verified insurance, and a track record of local work. Bonardi Construction holds licenses in NYC (#1274180), Nassau County (#H0446880000), and Suffolk County (#57853-H).",
      },
      {
        question: "Does Bonardi Construction serve all of Little Neck?",
        answer:
          "Yes. We serve the entire Little Neck area and the surrounding Queens communities including Douglaston, Bayside, and Oakland Gardens. Our team is familiar with the local architecture and construction requirements.",
      },
    ],
  },
  {
    slug: "flushing-ny",
    name: "Flushing, NY",
    county: "Queens",
    description:
      "Bonardi Construction is a trusted general contractor serving Flushing, Queens. Our services include concrete work, sidewalk repairs, waterproofing, demolition, and full-scale residential and commercial construction.",
    faqs: [
      {
        question: "What types of commercial construction does Bonardi handle in Flushing?",
        answer:
          "Bonardi Construction handles office buildouts, retail renovations, commercial demolition, parking lot paving, and full-scale commercial construction throughout Flushing. We are licensed and experienced with the diverse commercial needs of this active business district.",
      },
      {
        question: "Can you handle sidewalk violations in Flushing?",
        answer:
          "Yes. We regularly resolve DOT sidewalk violations for Flushing property owners, including concrete flag replacement, ADA-compliant curb cuts, and tree root damage repair. We handle all permit filings and DOT inspections.",
      },
    ],
  },
  {
    slug: "bayside-ny",
    name: "Bayside, NY",
    county: "Queens",
    description:
      "From home additions to commercial buildouts, Bonardi Construction delivers reliable general contracting services in Bayside, Queens. Licensed, bonded, and backed by decades of local experience.",
    faqs: [
      {
        question: "What home renovation services do you offer in Bayside?",
        answer:
          "In Bayside, we provide home additions, kitchen and bathroom remodeling, roofing, foundation repair, hardscaping, waterproofing, and more. We also handle new construction and dormer additions for homeowners looking to expand their living space.",
      },
      {
        question: "How long has Bonardi Construction served Bayside?",
        answer:
          "Bonardi Construction has served the Bayside community and surrounding Queens neighborhoods for over 30 years. Our principal, Gary M. Bonelli, has deep local experience and understands the construction needs of Bayside homeowners.",
      },
    ],
  },
  {
    slug: "bay-terrace-ny",
    name: "Bay Terrace, NY",
    county: "Queens",
    description:
      "Bonardi Construction serves Bay Terrace with comprehensive construction services including roofing, masonry, foundation repair, and drainage solutions. Quality craftsmanship for this waterfront Queens community.",
    faqs: [
      {
        question: "Are there special construction considerations for Bay Terrace's waterfront location?",
        answer:
          "Yes. Properties near the waterfront in Bay Terrace may require enhanced waterproofing, drainage solutions, and foundation protection due to higher water tables and coastal exposure. Bonardi Construction has extensive experience addressing these challenges.",
      },
      {
        question: "Does Bonardi Construction handle drainage issues in Bay Terrace?",
        answer:
          "Yes. We design and install French drains, catch basins, dry wells, and grading solutions to address the drainage challenges common in Bay Terrace and other waterfront Queens neighborhoods.",
      },
    ],
  },
  {
    slug: "astoria-ny",
    name: "Astoria, NY",
    county: "Queens",
    description:
      "As one of Queens' most dynamic neighborhoods, Astoria demands contractors who understand both historic preservation and modern builds. Bonardi Construction handles everything from brownstone restoration to new construction in Astoria.",
    faqs: [
      {
        question: "Does Bonardi Construction work on brownstone and historic buildings in Astoria?",
        answer:
          "Yes. Bonardi Construction specializes in brownstone restoration, masonry repointing, and facade repair for Astoria's historic building stock. We use traditional techniques and materials to preserve the character of historic structures while ensuring structural integrity.",
      },
      {
        question: "Can you handle both residential and commercial projects in Astoria?",
        answer:
          "Absolutely. We serve both residential homeowners and commercial property owners in Astoria with services including new construction, renovations, office buildouts, masonry restoration, roofing, and more.",
      },
    ],
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
