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
    relatedSlugs: ["asphalt", "sidewalks", "foundation-repair-restoration", "drainage"],
    tags: ["Exterior", "Commercial", "Structural"],
  },
  {
    slug: "roofing-services",
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
    relatedSlugs: ["waterproofing", "fire-damage-restoration", "home-additions-extensions", "foundation-repair-restoration"],
    tags: ["Residential", "Commercial"],
  },
  {
    slug: "masonry-brick-pointing",
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
    relatedSlugs: ["waterproofing", "foundation-repair-restoration", "concrete", "sidewalks"],
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
    relatedSlugs: ["construction-management", "framing", "foundation-repair-restoration", "home-additions-extensions"],
    tags: ["Residential", "Commercial"],
  },
  {
    slug: "home-additions-extensions",
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
    relatedSlugs: ["framing", "roofing-services", "new-construction", "foundation-repair-restoration"],
    tags: ["Residential", "Structural"],
  },
  {
    slug: "foundation-repair-restoration",
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
    relatedSlugs: ["water-and-mold-restoration", "framing", "roofing-services", "waterproofing"],
    tags: ["Restoration", "Emergency"],
  },
  {
    slug: "water-and-mold-restoration",
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
    relatedSlugs: ["fire-damage-restoration", "waterproofing", "foundation-repair-restoration", "drainage"],
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
    relatedSlugs: ["foundation-repair-restoration", "drainage", "masonry-brick-pointing", "roofing-services"],
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
    relatedSlugs: ["foundation-repair-restoration", "waterproofing", "excavation", "concrete"],
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
    relatedSlugs: ["foundation-repair-restoration", "drainage", "new-construction", "demolition"],
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
    relatedSlugs: ["new-construction", "home-additions-extensions", "roofing-services", "foundation-repair-restoration"],
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
    relatedSlugs: ["home-additions-extensions", "office-buildouts", "new-construction", "framing"],
    tags: ["Interior", "Residential"],
  },
  {
    slug: "generac-generators",
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
    relatedSlugs: ["new-construction", "home-additions-extensions", "office-buildouts"],
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
    relatedSlugs: ["concrete", "masonry-brick-pointing", "hardscaping", "drainage"],
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
  {
    slug: "concreteblacktop-striping",
    name: "Concrete, Blacktop & Striping",
    tagline: "Complete Concrete, Blacktop & Line Striping Services",
    intro:
      "Bonardi Construction provides full-scope concrete, blacktop, and pavement striping services for residential and commercial properties throughout Queens, Brooklyn, and Long Island. From pouring new concrete driveways to resurfacing blacktop lots and applying crisp line striping, we handle every phase.",
    bullets: [
      "Concrete driveway and walkway installation",
      "Blacktop paving and resurfacing",
      "Parking lot line striping and marking",
      "Curb installation and repair",
      "ADA-compliant crosswalk and handicap striping",
      "Site grading and drainage integration",
    ],
    whyUs:
      "We combine concrete, blacktop, and striping expertise under one roof — eliminating the need to coordinate multiple contractors and ensuring seamless transitions between surfaces.",
    cta: "Request Concrete & Blacktop Quote",
    relatedSlugs: ["concrete", "asphalt", "sidewalks", "hardscaping"],
    tags: ["Exterior", "Commercial"],
  },
  {
    slug: "parapet-wall-repair-rebuild",
    name: "Parapet Wall Repair & Rebuild",
    tagline: "Structural Parapet Wall Restoration for NYC Buildings",
    intro:
      "Parapet walls are critical to building safety and code compliance in New York City. Bonardi Construction repairs, rebuilds, and waterproofs deteriorating parapet walls to restore structural integrity and prevent costly violations.",
    bullets: [
      "Full parapet wall demolition and rebuild",
      "Brick repointing and mortar restoration",
      "Coping stone replacement and installation",
      "Through-wall flashing installation",
      "Waterproofing and sealant application",
      "DOB violation resolution and filing",
    ],
    whyUs:
      "Our masonry team understands NYC building code requirements for parapet walls. We handle DOB filings and inspections so your building stays compliant and structurally sound.",
    cta: "Request Parapet Repair Quote",
    relatedSlugs: ["masonry-brick-pointing", "masonry-restoration", "roofing-services", "waterproofing"],
    tags: ["Exterior", "Restoration", "Commercial"],
  },
  {
    slug: "construction-consultation",
    name: "Construction Consultation",
    tagline: "Expert Guidance Before You Break Ground",
    intro:
      "Not sure where to start? Bonardi Construction offers professional construction consultation services to help property owners plan projects, understand costs, navigate permits, and make informed decisions before committing to a full build.",
    bullets: [
      "Project feasibility assessment",
      "Preliminary cost estimating and budgeting",
      "Permit and code compliance guidance",
      "Scope of work development",
      "Contractor selection advisory",
      "Insurance and restoration consulting",
    ],
    whyUs:
      "With 30+ years in the field, our principal offers the kind of candid, experienced advice that helps you avoid costly mistakes and choose the right approach for your project.",
    cta: "Schedule a Consultation",
    relatedSlugs: ["construction-management", "new-construction", "office-buildouts"],
    tags: ["Commercial", "Residential"],
  },
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    tagline: "Custom Bathroom Renovations That Combine Form and Function",
    intro:
      "Bonardi Construction designs and builds custom bathroom renovations for homes across Queens, Brooklyn, and Long Island. From full gut renovations to targeted upgrades, we deliver bathrooms that are beautiful, functional, and built to last.",
    bullets: [
      "Full gut bathroom renovation",
      "Tile installation — floor, wall, and shower",
      "Vanity and cabinetry installation",
      "Plumbing fixture upgrades",
      "Waterproofing and moisture barrier systems",
      "ADA-accessible bathroom conversions",
    ],
    whyUs:
      "Bathrooms demand precision waterproofing and flawless tile work. Our crews get the details right — from membrane installation to grout lines — so your renovation looks great and stays dry for decades.",
    cta: "Request Bathroom Remodel Quote",
    relatedSlugs: ["kitchen-remodeling", "flooring", "home-additions-extensions", "framing"],
    tags: ["Residential", "Interior"],
  },
  {
    slug: "dormer-additions",
    name: "Dormer Additions",
    tagline: "Add Space, Light, and Value With a Custom Dormer",
    intro:
      "A dormer addition is one of the most effective ways to expand livable space, increase natural light, and add value to your home. Bonardi Construction builds shed, gable, and full dormers across Queens, Brooklyn, and Long Island.",
    bullets: [
      "Shed dormer design and construction",
      "Gable and hip dormer builds",
      "Full second-story dormer conversions",
      "Roofline integration and matching",
      "Interior framing, insulation, and finish",
      "Permit filing and DOB coordination",
    ],
    whyUs:
      "We specialize in seamlessly integrating dormers into existing rooflines so the addition looks original to the home. Every dormer is engineered for structural integrity and properly flashed to prevent leaks.",
    cta: "Plan Your Dormer Addition",
    relatedSlugs: ["home-additions-extensions", "roofing-services", "framing", "new-construction"],
    tags: ["Residential", "Structural"],
  },
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    tagline: "The Kitchen You've Always Wanted — Built by Experts",
    intro:
      "Bonardi Construction delivers full-service kitchen remodeling for homeowners across the New York metro area. From layout reconfiguration and cabinetry to countertops and flooring, we transform kitchens into the functional, beautiful heart of your home.",
    bullets: [
      "Full kitchen gut renovation",
      "Cabinet design, supply, and installation",
      "Countertop fabrication and installation",
      "Backsplash tile work",
      "Plumbing and electrical coordination",
      "Flooring and lighting upgrades",
    ],
    whyUs:
      "We manage every trade involved in a kitchen remodel — plumbing, electrical, carpentry, tile — under one contract. That means better coordination, fewer delays, and a finished kitchen that exceeds expectations.",
    cta: "Request Kitchen Remodel Quote",
    relatedSlugs: ["bathroom-remodeling", "flooring", "home-additions-extensions", "framing"],
    tags: ["Residential", "Interior"],
  },
  {
    slug: "commercial-milling-paving",
    name: "Commercial Milling & Paving",
    tagline: "Large-Scale Milling and Paving for Commercial Properties",
    intro:
      "Bonardi Construction provides commercial-grade asphalt milling and paving services for parking lots, roadways, and large commercial sites across the New York metro area. Our heavy equipment and experienced crews deliver smooth, durable surfaces built for high-traffic use.",
    bullets: [
      "Full-depth and surface milling for commercial lots",
      "Asphalt overlay and resurfacing",
      "Parking lot reconstruction",
      "ADA ramp and transition compliance",
      "Traffic management during paving operations",
      "Striping and signage installation",
    ],
    whyUs:
      "We've paved commercial sites ranging from retail plazas to industrial yards. Our crews work efficiently to minimize downtime for your business while delivering a surface that holds up under heavy commercial traffic.",
    cta: "Request Commercial Paving Quote",
    relatedSlugs: ["asphalt", "asphalt-milling", "commercial-parking-lot-maintenance", "concrete"],
    tags: ["Commercial", "Exterior"],
  },
  {
    slug: "sheetrock-painting",
    name: "Sheetrock & Painting",
    tagline: "Professional Drywall and Painting for a Flawless Finish",
    intro:
      "Bonardi Construction provides expert sheetrock installation, taping, and painting services for residential and commercial interiors. Whether it's new construction, renovation, or damage repair, we deliver smooth walls and crisp finishes.",
    bullets: [
      "Sheetrock/drywall installation",
      "Taping, mudding, and skim coating",
      "Level 5 finish for premium results",
      "Interior painting — walls, ceilings, and trim",
      "Drywall repair and patching",
      "Texture matching for existing surfaces",
    ],
    whyUs:
      "Clean drywall work is the difference between a renovation that looks professional and one that doesn't. Our finishers deliver seamless surfaces ready for paint, every time.",
    cta: "Request Sheetrock & Painting Quote",
    relatedSlugs: ["framing", "office-buildouts", "home-additions-extensions", "fire-damage-restoration"],
    tags: ["Interior", "Residential", "Commercial"],
  },
  {
    slug: "masonry-restoration",
    name: "Masonry Restoration",
    tagline: "Restore the Beauty and Integrity of Historic Masonry",
    intro:
      "Bonardi Construction's masonry restoration division specializes in bringing deteriorating brick, stone, and brownstone facades back to their original condition. We combine traditional craftsmanship with modern materials for restorations that last.",
    bullets: [
      "Brownstone and limestone facade restoration",
      "Historic mortar matching and repointing",
      "Brick replacement and color matching",
      "Lintel and sill replacement",
      "Facade cleaning and sealing",
      "Landmark-compliant restoration work",
    ],
    whyUs:
      "Masonry restoration requires an understanding of historic materials and techniques. We match mortar composition, brick color, and joint profile to preserve the building's original character while ensuring structural longevity.",
    cta: "Request Restoration Quote",
    relatedSlugs: ["masonry-brick-pointing", "parapet-wall-repair-rebuild", "waterproofing", "foundation-repair-restoration"],
    tags: ["Exterior", "Restoration"],
  },
  {
    slug: "concrete-leveling",
    name: "Concrete Leveling",
    tagline: "Fix Sunken and Uneven Concrete Without Full Replacement",
    intro:
      "Sunken sidewalks, settled slabs, and uneven garage floors don't always require full replacement. Bonardi Construction provides concrete leveling services that restore grade and eliminate trip hazards at a fraction of the cost of a tear-out.",
    bullets: [
      "Mudjacking and slab lifting",
      "Polyurethane foam injection leveling",
      "Sidewalk trip hazard correction",
      "Garage and basement floor leveling",
      "Pool deck leveling",
      "DOT compliance for uneven sidewalks",
    ],
    whyUs:
      "Concrete leveling is faster, cleaner, and significantly less expensive than full replacement. We assess each slab to determine whether leveling is appropriate or if replacement is the better long-term solution.",
    cta: "Request Leveling Assessment",
    relatedSlugs: ["concrete", "sidewalks", "foundation-repair-restoration", "soil-stabilization"],
    tags: ["Exterior", "Residential"],
  },
  {
    slug: "soil-stabilization",
    name: "Soil Stabilization",
    tagline: "Strengthen Weak Soil to Protect Your Structure's Foundation",
    intro:
      "Unstable soil is the root cause of foundation settlement, slab cracking, and pavement failure. Bonardi Construction provides soil stabilization solutions that address the problem at its source — below grade.",
    bullets: [
      "Chemical soil stabilization",
      "Compaction grouting",
      "Soil mixing and amendment",
      "Subgrade preparation for new construction",
      "Erosion control and grading",
      "Geotechnical coordination",
    ],
    whyUs:
      "We work with geotechnical engineers to select the right stabilization method for your site conditions. Proper soil preparation prevents the kind of costly structural failures that surface years after construction.",
    cta: "Request Soil Assessment",
    relatedSlugs: ["foundation-repair-restoration", "excavation", "concrete-leveling", "drainage"],
    tags: ["Site Work", "Structural"],
  },
  {
    slug: "commercial-underpinning",
    name: "Commercial Underpinning",
    tagline: "Strengthen and Deepen Foundations for Commercial Structures",
    intro:
      "When commercial foundations are compromised by settlement, adjacent excavation, or increased load requirements, underpinning restores structural integrity. Bonardi Construction performs commercial underpinning across the NYC metro area.",
    bullets: [
      "Mass concrete underpinning",
      "Mini-pile and micro-pile underpinning",
      "Pit underpinning for adjacent construction",
      "Foundation depth extension",
      "Structural monitoring during underpinning",
      "Engineering coordination and documentation",
    ],
    whyUs:
      "Commercial underpinning demands precision engineering and careful execution. Our crews work methodically, in sequences designed to maintain structural stability throughout the process.",
    cta: "Discuss Underpinning Needs",
    relatedSlugs: ["foundation-repair-restoration", "excavation", "soil-stabilization", "construction-management"],
    tags: ["Commercial", "Structural"],
  },
  {
    slug: "commercial-parking-lot-maintenance",
    name: "Commercial Parking Lot Maintenance",
    tagline: "Keep Your Parking Lot Safe, Compliant, and Professional",
    intro:
      "A well-maintained parking lot protects your investment, reduces liability, and makes a strong first impression. Bonardi Construction provides comprehensive parking lot maintenance programs for commercial property owners and managers.",
    bullets: [
      "Crack sealing and pothole repair",
      "Sealcoating and surface protection",
      "Line striping and stenciling",
      "ADA compliance upgrades",
      "Catch basin and drainage maintenance",
      "Seasonal maintenance programs",
    ],
    whyUs:
      "Reactive repairs cost more than proactive maintenance. We design maintenance programs that extend pavement life, maintain ADA compliance, and keep your lot looking professional year-round.",
    cta: "Request Maintenance Plan",
    relatedSlugs: ["asphalt", "asphalt-sealcoating", "commercial-milling-paving", "drainage"],
    tags: ["Commercial", "Exterior"],
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
