export type ServiceData = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  bullets: string[];
  whyUs: string;
  cta: string;
  relatedSlugs: string[];
  tags: string[];
};

export const services: ServiceData[] = [
  {
    slug: "asphalt",
    name: "Asphalt Services",
    tagline: "Smooth, Durable Asphalt — From Installation to Long-Term Maintenance",
    intro:
      "Bonardi Construction delivers complete asphalt solutions for residential driveways, commercial parking lots, and municipal roadways across Queens, Brooklyn, and Long Island. Our licensed crews use professional-grade equipment and materials to deliver surfaces that hold up against the demands of the New York climate.",
    bullets: [
      "New asphalt paving for driveways and parking lots",
      "Asphalt resurfacing and overlay",
      "Cold milling / asphalt milling for resurfacing preparation",
      "Pothole patching and crack filling",
      "Parking lot striping and marking",
      "Protective sealcoating to extend pavement life",
    ],
    whyUs:
      "With 30+ years of paving experience, we've managed projects ranging from single residential driveways to large commercial lots. Every job is backed by our commitment to clean edges, proper grading, and a finish that lasts.",
    cta: "Request Asphalt Quote",
    relatedSlugs: ["asphalt-sealcoating", "asphalt-milling", "concrete", "hardscaping"],
    tags: ["Exterior", "Commercial", "Residential"],
  },
  {
    slug: "concrete",
    name: "Concrete, Blacktop & Striping",
    tagline: "Structural Concrete Work Executed With Precision",
    intro:
      "From concrete foundations and driveways to blacktop resurfacing and lot striping, Bonardi Construction handles all phases of concrete and blacktop work. Our skilled craftsmen ensure proper mix ratios, forming, and curing for surfaces built to withstand heavy use and harsh winters.",
    bullets: [
      "Concrete driveways, walkways, and patios",
      "Foundation concrete work",
      "Blacktop installation and repair",
      "Parking lot layout and striping",
      "Curbs, gutters, and site grading",
      "Decorative stamped concrete options",
    ],
    whyUs:
      "We use high-quality concrete mixes and precision forming techniques to ensure flat, durable, long-lasting results. Every project is graded for proper drainage to prevent pooling and cracking over time.",
    cta: "Request Concrete Quote",
    relatedSlugs: ["asphalt", "sidewalks", "foundation-repair", "drainage"],
    tags: ["Exterior", "Commercial", "Structural"],
  },
  {
    slug: "roofing",
    name: "Roofing Services",
    tagline: "Your Roof is Your First Line of Defense — We Make It Bulletproof",
    intro:
      "Bonardi Construction's roofing team installs, repairs, and replaces residential and commercial roofing systems throughout the New York metro area. From architectural shingles to flat EPDM membranes, we match the right system to your structure and budget.",
    bullets: [
      "Asphalt shingle installation and replacement",
      "Flat and low-slope roofing (EPDM, TPO, modified bitumen)",
      "Roof repairs — shingles, flashing, valleys",
      "Gutters and downspout installation",
      "Roof inspections and maintenance programs",
      "Emergency tarping and storm damage response",
    ],
    whyUs:
      "Every roofing job we complete is backed by manufacturer warranties and our own labor guarantee. We inspect the deck, flashing, and drainage before a single shingle is installed.",
    cta: "Request Roofing Quote",
    relatedSlugs: ["waterproofing", "fire-damage-restoration", "home-additions", "foundation-repair"],
    tags: ["Residential", "Commercial"],
  },
  {
    slug: "masonry",
    name: "Masonry, Brick Pointing & Weatherproofing",
    tagline: "Restore Your Masonry to Factory-New Condition",
    intro:
      "Bonardi Construction's masonry division specializes in tuckpointing, brick repair, brownstone restoration, and weatherproofing throughout New York City and Long Island. Deteriorating mortar joints are a leading cause of water infiltration — we correct the problem at its source.",
    bullets: [
      "Tuckpointing and mortar joint repointing",
      "Brick repair and replacement",
      "Brownstone and limestone restoration",
      "Parapet wall repairs and coping replacement",
      "Masonry waterproofing and sealants",
      "Chimney repair and rebuilding",
    ],
    whyUs:
      "We match mortar color and profile to your existing masonry for seamless, invisible repairs. Our weatherproofing treatments are vapor-permeable — they protect without trapping moisture inside the wall.",
    cta: "Request Masonry Quote",
    relatedSlugs: ["waterproofing", "foundation-repair", "concrete", "sidewalks"],
    tags: ["Exterior", "Restoration"],
  },
  {
    slug: "new-construction",
    name: "New Construction",
    tagline: "From Empty Lot to Finished Structure — Start to Finish",
    intro:
      "As a full-service general contractor, Bonardi Construction manages ground-up residential and commercial construction projects throughout the NYC metro area. We coordinate every trade, permit, and inspection so you don't have to.",
    bullets: [
      "Custom single-family home construction",
      "Multi-family residential builds",
      "Commercial shell and core construction",
      "Permit expediting and DOB filings",
      "Full subcontractor coordination",
      "Punch list management through C/O",
    ],
    whyUs:
      "Our 30 years of local contracting experience means we know exactly how to navigate New York City's complex permit and inspection processes. We bring projects in on time and on budget.",
    cta: "Discuss Your New Build",
    relatedSlugs: ["construction-management", "framing", "foundation-repair", "home-additions"],
    tags: ["Residential", "Commercial"],
  },
  {
    slug: "home-additions",
    name: "Home Additions & Extensions",
    tagline: "More Space, Seamlessly Integrated With What You Already Love",
    intro:
      "Whether you need an extra bedroom, a first-floor extension, a dormer, or a full second-story addition, Bonardi Construction designs and builds additions that feel like they were always part of the original home.",
    bullets: [
      "Rear and side yard extensions",
      "Dormers and second-story additions",
      "Garage conversions and additions",
      "Sunrooms and enclosed porches",
      "Master suite additions",
      "Basement finishing and excavation",
    ],
    whyUs:
      "We work with your existing structure, matching materials, rooflines, and trim profiles so the addition is indistinguishable from the original construction. Full permit and inspection management included.",
    cta: "Plan Your Addition",
    relatedSlugs: ["framing", "roofing", "new-construction", "foundation-repair"],
    tags: ["Residential", "Structural"],
  },
  {
    slug: "foundation-repair",
    name: "Foundation Repair & Restoration",
    tagline: "When the Ground Shifts, We Keep Your Structure Standing",
    intro:
      "Foundation problems compound over time. Bonardi Construction's structural repair team diagnoses and resolves foundation cracks, settlement, bowing walls, and moisture intrusion before minor issues become major structural failures.",
    bullets: [
      "Foundation crack injection and repair",
      "Wall anchoring and bracing systems",
      "Piering and underpinning",
      "Interior and exterior waterproofing",
      "Sump pump installation",
      "Drainage correction around foundation",
    ],
    whyUs:
      "We don't just patch symptoms — we identify the underlying cause and correct it permanently. Our repair methods are backed by structural engineering guidance and full documentation for your records.",
    cta: "Schedule Foundation Inspection",
    relatedSlugs: ["waterproofing", "drainage", "concrete", "excavation"],
    tags: ["Structural", "Residential"],
  },
  {
    slug: "fire-damage-restoration",
    name: "Fire Damage Restoration",
    tagline: "Emergency Response. Complete Structural Restoration.",
    intro:
      "When disaster strikes, Bonardi Construction responds immediately. Our fire damage restoration team manages every phase — from emergency board-up and debris removal through structural rebuild and finish work.",
    bullets: [
      "24-hour emergency board-up and tarping",
      "Fire and smoke debris removal",
      "Structural damage assessment",
      "Framing, sheathing, and structural rebuild",
      "Drywall, insulation, and interior finishes",
      "Insurance documentation support",
    ],
    whyUs:
      "We coordinate directly with your insurance carrier and provide detailed scopes of work that meet or exceed adjuster expectations. Our goal is to restore your property to pre-loss condition — or better.",
    cta: "Emergency Contact: 718.762.3400",
    relatedSlugs: ["water-mold-restoration", "framing", "roofing", "waterproofing"],
    tags: ["Restoration", "Emergency"],
  },
  {
    slug: "water-mold-restoration",
    name: "Water & Mold Restoration",
    tagline: "Fast Response. Thorough Remediation. Complete Restoration.",
    intro:
      "Water damage escalates quickly. Bonardi Construction's restoration team deploys rapidly to extract water, dry the structure, and remediate mold before it becomes a health and structural hazard.",
    bullets: [
      "Emergency water extraction",
      "Structural drying and dehumidification",
      "Mold testing and professional remediation",
      "Drywall, insulation, and material removal",
      "Reconstruction and finish restoration",
      "Insurance claim coordination",
    ],
    whyUs:
      "We use industrial extraction and drying equipment and follow IICRC best practices for mold remediation. Documentation provided at every step to support your insurance claim.",
    cta: "Emergency Contact: 718.762.3400",
    relatedSlugs: ["fire-damage-restoration", "waterproofing", "foundation-repair", "drainage"],
    tags: ["Restoration", "Emergency"],
  },
  {
    slug: "waterproofing",
    name: "Waterproofing",
    tagline: "Keep Water Out — Permanently",
    intro:
      "Water infiltration is the leading cause of structural damage in New York properties. Bonardi Construction provides comprehensive waterproofing solutions for basements, foundations, roofs, and exterior walls that create lasting barriers against moisture.",
    bullets: [
      "Interior basement waterproofing systems",
      "Exterior foundation waterproofing",
      "Crystalline and membrane-based waterproofing",
      "Flat roof waterproofing and membrane systems",
      "Window and door perimeter sealing",
      "French drain and sump pump integration",
    ],
    whyUs:
      "We assess the source of water entry before recommending a solution — because every waterproofing failure is different. Our systems carry manufacturer and installation warranties.",
    cta: "Request Waterproofing Assessment",
    relatedSlugs: ["foundation-repair", "drainage", "masonry", "roofing"],
    tags: ["Exterior", "Structural"],
  },
  {
    slug: "hardscaping",
    name: "Hardscaping",
    tagline: "Outdoor Spaces Built to Impress, Engineered to Endure",
    intro:
      "Bonardi Construction designs and installs premium hardscaping using Cambridge, Nicolock, and Unilock paving systems. From elegant patios to robust retaining walls, we transform outdoor spaces into functional extensions of your home or business.",
    bullets: [
      "Paver patios and outdoor entertaining areas",
      "Retaining walls and raised planters",
      "Walkways and front entrance design",
      "Driveway pavers and borders",
      "Steps, stoops, and landing areas",
      "Outdoor kitchen and fire pit surrounds",
    ],
    whyUs:
      "As certified installers for Cambridge, Nicolock, and Unilock, we have access to the full product lines and installation warranties these manufacturers provide. Every base course is engineered for long-term stability.",
    cta: "Request Hardscaping Quote",
    relatedSlugs: ["concrete", "drainage", "sidewalks", "asphalt"],
    tags: ["Exterior", "Residential"],
  },
  {
    slug: "demolition",
    name: "Demolition",
    tagline: "Safe, Efficient Demolition — Residential to Commercial Scale",
    intro:
      "Bonardi Construction's demolition team handles selective interior strip-outs through full structural demolitions safely and efficiently. All work is performed under proper permits with full debris removal and site cleanup.",
    bullets: [
      "Interior selective demolition",
      "Full residential demolition",
      "Commercial buildout strip-outs",
      "Concrete and masonry breaking",
      "Dumpster coordination and debris removal",
      "Permit filing and DOB coordination",
    ],
    whyUs:
      "We perform demolition with the next phase of construction in mind — protecting what stays, removing what goes, and leaving you a clean slate to build on.",
    cta: "Request Demolition Quote",
    relatedSlugs: ["new-construction", "construction-management", "excavation", "concrete"],
    tags: ["Commercial", "Residential"],
  },
  {
    slug: "drainage",
    name: "Drainage Solutions",
    tagline: "Move Water Away From Your Property — Before It Becomes a Problem",
    intro:
      "Poor drainage causes foundation damage, flooding, landscape erosion, and pavement failure. Bonardi Construction designs and installs comprehensive drainage systems that redirect water safely away from your structure.",
    bullets: [
      "French drain installation",
      "Catch basins and area drains",
      "Dry wells and infiltration systems",
      "Swale grading and earthwork",
      "Downspout extensions and underground discharge",
      "Stormwater management for commercial sites",
    ],
    whyUs:
      "We assess your property's grading and drainage patterns before designing a solution. Our systems are sized for the actual water volumes your site generates.",
    cta: "Request Drainage Assessment",
    relatedSlugs: ["foundation-repair", "waterproofing", "excavation", "concrete"],
    tags: ["Exterior", "Site"],
  },
  {
    slug: "excavation",
    name: "Excavation",
    tagline: "Precision Earthwork as the Foundation for Every Great Project",
    intro:
      "Bonardi Construction provides residential and commercial excavation services throughout the NYC metro area. Our experienced operators and modern equipment ensure precise, safe excavation every time.",
    bullets: [
      "Site excavation for new construction",
      "Foundation excavation and shoring",
      "Utility trenching",
      "Soil removal and disposal",
      "Grading and site leveling",
      "Pool and basement excavation",
    ],
    whyUs:
      "Our operators understand NYC soil conditions and local utility infrastructure. We're fully bonded and coordinate all required utility locates before breaking ground.",
    cta: "Request Excavation Quote",
    relatedSlugs: ["foundation-repair", "drainage", "new-construction", "demolition"],
    tags: ["Site Work"],
  },
  {
    slug: "construction-management",
    name: "Construction Management",
    tagline: "Expert Oversight From First Shovel to Final Walk-Through",
    intro:
      "Bonardi Construction provides full-service construction management for owners who need professional oversight without the headaches. We manage schedules, budgets, subcontractors, and quality — so you focus on your business.",
    bullets: [
      "Pre-construction planning and budgeting",
      "Subcontractor procurement and management",
      "Schedule development and adherence",
      "Cost control and change order management",
      "Quality inspections at every milestone",
      "Owner reporting and transparent communication",
    ],
    whyUs:
      "Our principal has managed millions of dollars in construction value across the NYC metro area. You get a seasoned owner-operator as your advocate, not a junior PM reading from a checklist.",
    cta: "Discuss Your Project",
    relatedSlugs: ["new-construction", "office-buildouts", "demolition", "framing"],
    tags: ["Commercial", "Residential"],
  },
  {
    slug: "office-buildouts",
    name: "Office Buildouts",
    tagline: "Commercial Interiors That Reflect Your Brand and Support Your Team",
    intro:
      "Bonardi Construction builds out office spaces, retail environments, and commercial interiors across the New York metro area. We take your space from white-box to move-in ready — on schedule.",
    bullets: [
      "Tenant improvement and office buildout",
      "Demising wall construction",
      "Ceiling and flooring systems",
      "Electrical rough-in coordination",
      "HVAC and plumbing rough-in coordination",
      "Paint, millwork, and finish carpentry",
    ],
    whyUs:
      "We've built out offices, medical suites, retail spaces, and restaurants across New York. Our commercial crews work cleanly and on schedule to minimize disruption to adjacent tenants.",
    cta: "Request Commercial Quote",
    relatedSlugs: ["construction-management", "demolition", "new-construction", "flooring"],
    tags: ["Commercial"],
  },
  {
    slug: "framing",
    name: "Framing",
    tagline: "The Backbone of Every Structure — Built Right the First Time",
    intro:
      "Bonardi Construction's framing crews build the structural skeleton of residential and commercial projects with precision. Properly framed structures are safer, more energy-efficient, and last decades longer.",
    bullets: [
      "Wood and steel stud framing",
      "Structural wall and header installation",
      "Floor and ceiling joist systems",
      "Staircase framing",
      "Sheathing and house wrap installation",
      "Code-compliant documentation",
    ],
    whyUs:
      "Our framers read structural drawings fluently and frame to tolerance. Every opening, bearing point, and fastener pattern is executed per plan to ensure the structure performs as designed.",
    cta: "Request Framing Quote",
    relatedSlugs: ["new-construction", "home-additions", "roofing", "foundation-repair"],
    tags: ["Structural"],
  },
  {
    slug: "flooring",
    name: "Flooring",
    tagline: "The Finishing Touch That Ties Every Room Together",
    intro:
      "Bonardi Construction installs hardwood, engineered wood, luxury vinyl plank, tile, and specialty flooring systems in residential and commercial spaces across New York.",
    bullets: [
      "Hardwood floor installation and refinishing",
      "Engineered wood and LVP",
      "Porcelain and ceramic tile",
      "Large-format tile with minimal grout joints",
      "Radiant heat flooring systems",
      "Floor leveling and subfloor preparation",
    ],
    whyUs:
      "A beautiful floor starts with a perfectly prepared subfloor. We correct any flatness or moisture issues before installation to ensure your floor looks perfect and performs for decades.",
    cta: "Request Flooring Quote",
    relatedSlugs: ["home-additions", "office-buildouts", "new-construction", "framing"],
    tags: ["Interior", "Residential"],
  },
  {
    slug: "generators",
    name: "Generac Generators",
    tagline: "Never Lose Power Again — Authorized Generac Dealer & Installer",
    intro:
      "As an authorized Generac dealer and certified installer, Bonardi Construction provides standby generator systems for residential and commercial properties. From sizing to installation and ongoing service, we handle it all.",
    bullets: [
      "Generac standby generator sales and installation",
      "Automatic transfer switch installation",
      "Natural gas and propane generator systems",
      "Electrical sub-panel integration",
      "Annual service and maintenance programs",
      "Permit filing and utility coordination",
    ],
    whyUs:
      "We're one of a limited number of Generac-authorized installation contractors in the New York area. Every installation is completed by certified technicians and backed by manufacturer warranty.",
    cta: "Get Generator Quote",
    relatedSlugs: ["new-construction", "home-additions", "office-buildouts"],
    tags: ["Specialty", "Residential", "Commercial"],
  },
  {
    slug: "sidewalks",
    name: "Sidewalk Repairs",
    tagline: "DOT Violations Resolved Quickly, Compliantly, Permanently",
    intro:
      "New York City property owners are responsible for the sidewalk in front of their building. Bonardi Construction handles DOT violation removals, new concrete sidewalk installation, and flag replacement to full NYC compliance standards.",
    bullets: [
      "DOT sidewalk violation removal",
      "Concrete flag replacement and new pours",
      "ADA-compliant curb cut installation",
      "Tree root damage repair",
      "Bluestone and pavers",
      "DOT permit filing and inspection",
    ],
    whyUs:
      "We know the DOT process inside and out. Our sidewalk crews are licensed and experienced with NYC compliance standards, and we handle all permit filings from start to sign-off.",
    cta: "Request Sidewalk Quote",
    relatedSlugs: ["concrete", "masonry", "hardscaping", "drainage"],
    tags: ["Exterior", "Compliance"],
  },
  {
    slug: "asphalt-sealcoating",
    name: "Asphalt Sealcoating",
    tagline: "Protect Your Pavement Investment for Pennies on the Dollar",
    intro:
      "Sealcoating is the most cost-effective way to extend the life of asphalt surfaces. Bonardi Construction applies professional-grade coal tar and asphalt-based sealers to driveways and parking lots across Queens and Long Island.",
    bullets: [
      "Coal tar and asphalt-based sealers",
      "Crack filling before sealing",
      "Commercial parking lot sealcoating",
      "Residential driveway sealcoating",
      "Striping reapplication post-seal",
      "Multi-year maintenance programs",
    ],
    whyUs:
      "We prep before we seal — cracks are filled, edges are trimmed, and oil spots are treated so the sealer bonds properly and lasts. No shortcuts.",
    cta: "Request Sealcoating Quote",
    relatedSlugs: ["asphalt", "asphalt-milling", "concrete"],
    tags: ["Exterior"],
  },
  {
    slug: "asphalt-milling",
    name: "Asphalt Milling",
    tagline: "Precision Milling for Smooth Resurfacing Results",
    intro:
      "Cold planing / asphalt milling removes deteriorated top layers of pavement to create a clean, level surface for new asphalt overlay. Bonardi Construction operates professional milling equipment to precise depths.",
    bullets: [
      "Cold milling to specified depth",
      "Drainage slope correction via mill",
      "Prep for parking lot resurfacing",
      "Reclaimed asphalt (RAP) disposal",
      "ADA-compliant transition management",
      "Combination milling + paving packages",
    ],
    whyUs:
      "Proper milling depth and transition management are what separate a long-lasting resurfacing job from one that fails prematurely. Our operators cut to plan.",
    cta: "Request Milling Quote",
    relatedSlugs: ["asphalt", "asphalt-sealcoating", "concrete"],
    tags: ["Exterior", "Commercial"],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServiceData[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as ServiceData[];
}
