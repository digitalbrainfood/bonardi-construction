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
  faqs?: { question: string; answer: string }[];
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
    faqs: [
      {
        question: "How long does asphalt paving last in New York?",
        answer:
          "A properly installed asphalt driveway or parking lot in the New York area typically lasts 15 to 25 years with routine maintenance. Factors like traffic volume, drainage, and regular sealcoating affect longevity. Bonardi Construction uses commercial-grade materials and proper base preparation to maximize the lifespan of every asphalt surface we install.",
      },
      {
        question: "When is the best time to sealcoat an asphalt driveway?",
        answer:
          "The best time to sealcoat in the New York metro area is late spring through early fall, when temperatures are consistently above 50 degrees Fahrenheit. We recommend waiting at least 6 to 12 months after a new asphalt installation before applying the first sealcoat, and then reapplying every 2 to 3 years for maximum protection.",
      },
      {
        question: "How much does asphalt paving cost in Queens?",
        answer:
          "Asphalt paving costs in Queens typically range from $3 to $7 per square foot for residential driveways, depending on site conditions, base preparation, and thickness. Commercial parking lots may vary based on size and grading requirements. Bonardi Construction provides free on-site estimates so you get an accurate price tailored to your project.",
      },
    ],
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
    faqs: [
      {
        question: "What is the difference between concrete and blacktop?",
        answer:
          "Concrete is made from cement, water, and aggregate and cures to a rigid, light-colored surface that can last 30+ years. Blacktop (asphalt) uses a petroleum-based binder, is darker, more flexible, and typically costs less upfront but requires more frequent maintenance. Bonardi Construction installs both and can recommend the right material based on your project needs and budget.",
      },
      {
        question: "How long does a concrete driveway take to cure?",
        answer:
          "Concrete reaches enough strength for foot traffic within 24 to 48 hours, but full curing takes approximately 28 days. During that time, you should avoid parking vehicles on the surface for at least 7 days and heavy trucks for 30 days. We apply proper curing compounds to ensure your concrete reaches maximum strength.",
      },
      {
        question: "Do I need a permit for a new concrete driveway in NYC?",
        answer:
          "Yes, most concrete driveway work in New York City requires a permit from the Department of Buildings or the Department of Transportation, depending on whether the work involves the sidewalk or curb cut. Bonardi Construction handles all permit filings and inspections as part of our service.",
      },
    ],
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
    faqs: [
      {
        question: "How do I know if my roof needs to be replaced or just repaired?",
        answer:
          "Signs that indicate replacement include widespread shingle curling or buckling, multiple active leaks, sagging roof deck, and a roof that is 20+ years old. If damage is limited to a small area such as missing shingles around a vent or flashing failure, a repair may be sufficient. Bonardi Construction provides free roof inspections to help you make the right call.",
      },
      {
        question: "What type of roofing is best for flat roofs in NYC?",
        answer:
          "For flat and low-slope roofs common in New York City, EPDM rubber, TPO, and modified bitumen are the most popular and effective systems. Each has advantages depending on your building type and budget. Our roofing team evaluates your structure and recommends the best system for maximum longevity and weather protection.",
      },
      {
        question: "Does Bonardi Construction handle emergency roof repairs?",
        answer:
          "Yes. We provide emergency tarping and board-up services for storm damage, fallen trees, and fire-related roof damage. Our emergency crews respond quickly to prevent further water intrusion and structural damage. Call us at 718.762.3400 for immediate assistance.",
      },
    ],
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
    faqs: [
      {
        question: "What is tuckpointing and when does my building need it?",
        answer:
          "Tuckpointing (also called repointing) is the process of removing deteriorated mortar from brick joints and replacing it with fresh mortar. You need it when you see crumbling, receding, or missing mortar between bricks. Left unaddressed, deteriorated joints allow water to penetrate the wall, leading to structural damage and interior moisture problems.",
      },
      {
        question: "Can you match the existing mortar color on my brick building?",
        answer:
          "Yes. Bonardi Construction carefully matches mortar color, texture, and joint profile to your existing masonry so repairs blend seamlessly with the original work. We use custom mortar mixes and traditional application techniques to ensure the finished result is virtually invisible.",
      },
      {
        question: "How long does brick pointing last?",
        answer:
          "Quality tuckpointing using the correct mortar type for your building can last 25 to 30 years or longer. The key is using mortar that is softer than the surrounding brick to prevent cracking, and ensuring joints are properly tooled and sealed. Our masonry crews follow best practices for lasting results.",
      },
    ],
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
    faqs: [
      {
        question: "How long does it take to build a new home in Queens?",
        answer:
          "A typical ground-up residential build in Queens takes 8 to 14 months from permit approval to certificate of occupancy, depending on the size and complexity of the project. The permit process itself can add 2 to 4 months. Bonardi Construction manages all phases including permit expediting to keep your timeline on track.",
      },
      {
        question: "Do I need a general contractor for new construction in NYC?",
        answer:
          "Yes. New York City requires that most construction work be performed under the supervision of a licensed general contractor or registered design professional. A general contractor manages all subcontractors, scheduling, inspections, and code compliance, which is essential for a successful build.",
      },
      {
        question: "What permits are required for new construction in New York City?",
        answer:
          "New construction in NYC requires permits from the Department of Buildings, including a New Building permit, work permits for plumbing, electrical, and mechanical systems, and ultimately a Certificate of Occupancy. Bonardi Construction handles all DOB filings and coordinates inspections throughout the process.",
      },
    ],
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
    faqs: [
      {
        question: "Do I need a permit for a home addition in Queens?",
        answer:
          "Yes. Home additions in Queens and throughout NYC require permits from the Department of Buildings. This includes structural alterations, new square footage, and changes to the building footprint or height. Bonardi Construction manages the entire permit process, including architectural plans, DOB filings, and all required inspections.",
      },
      {
        question: "How much does a home addition cost in New York?",
        answer:
          "Home addition costs in the NYC area typically range from $200 to $500+ per square foot depending on the scope. A simple rear extension costs less than a second-story addition or dormer, which involves roofing, structural engineering, and more complex framing. We provide detailed estimates after an on-site evaluation.",
      },
      {
        question: "Will a home addition increase my property value?",
        answer:
          "Yes. A well-designed and professionally built addition typically increases property value by 50 to 80 percent of the construction cost. Additions that add bedrooms, bathrooms, or expand kitchens and living areas tend to deliver the strongest return, especially in desirable Queens neighborhoods.",
      },
    ],
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
    faqs: [
      {
        question: "How do I know if my foundation has a serious problem?",
        answer:
          "Warning signs of a serious foundation issue include horizontal cracks in basement or block walls, doors and windows that stick or no longer close properly, visible wall separation from the ceiling or floor, and floors that are noticeably uneven. Hairline vertical cracks from shrinkage are generally normal. When in doubt, schedule an inspection with Bonardi Construction.",
      },
      {
        question: "Can a cracked foundation be repaired without replacing it?",
        answer:
          "In most cases, yes. Foundation cracks can be repaired using epoxy or polyurethane injection, carbon fiber reinforcement, wall anchors, or piering systems depending on the type and severity of the damage. Full replacement is rarely necessary. Bonardi Construction evaluates each situation and recommends the most effective and cost-efficient solution.",
      },
      {
        question: "How much does foundation repair cost in New York?",
        answer:
          "Foundation repair costs vary widely based on the type of problem. Simple crack injections may start around $500 to $1,500, while more complex work like underpinning or wall anchoring can range from $5,000 to $25,000 or more. We provide free inspections and detailed estimates so you know exactly what to expect.",
      },
    ],
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
    faqs: [
      {
        question: "What should I do immediately after a house fire?",
        answer:
          "After the fire department clears the scene, contact your insurance company to open a claim, and then call a licensed restoration contractor like Bonardi Construction. We provide 24-hour emergency board-up and tarping to secure the property, prevent further damage, and begin the assessment process immediately.",
      },
      {
        question: "Does Bonardi Construction work with insurance companies for fire damage?",
        answer:
          "Yes. We work directly with your insurance carrier and provide detailed scopes of work, photo documentation, and line-item estimates that meet adjuster requirements. Our goal is to make the restoration process as smooth as possible while ensuring you receive fair compensation for the damage.",
      },
      {
        question: "How long does fire damage restoration take?",
        answer:
          "The timeline depends on the extent of the damage. Minor fire damage with localized structural repair may take 4 to 8 weeks. A full structural rebuild after a significant fire can take 3 to 6 months or longer. Bonardi Construction provides a detailed timeline during the initial assessment.",
      },
    ],
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
    faqs: [
      {
        question: "How quickly should water damage be addressed?",
        answer:
          "Water damage should be addressed within 24 to 48 hours to prevent mold growth, which can begin in as little as 24 hours in warm, humid conditions. Bonardi Construction provides rapid-response water extraction and structural drying to minimize secondary damage and reduce restoration costs.",
      },
      {
        question: "Can mold come back after professional remediation?",
        answer:
          "Mold will not return if the underlying moisture source is identified and permanently corrected. Professional remediation removes existing mold and contaminated materials, but without fixing the water intrusion issue — whether it is a leak, poor drainage, or condensation — mold can recur. We address both the mold and its cause.",
      },
      {
        question: "Does homeowner's insurance cover water and mold damage?",
        answer:
          "Most homeowner's policies cover sudden and accidental water damage such as pipe bursts and appliance failures. Coverage for mold varies by policy and is sometimes limited or excluded. Bonardi Construction coordinates with your insurance adjuster and provides the documentation needed to support your claim.",
      },
    ],
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
    faqs: [
      {
        question: "What is the best waterproofing method for a basement in NYC?",
        answer:
          "The best method depends on the source and severity of water intrusion. Interior waterproofing systems with a sump pump work well for managing hydrostatic pressure, while exterior waterproofing with membrane application provides the most complete barrier. Bonardi Construction assesses your specific situation and recommends the approach that will be most effective long-term.",
      },
      {
        question: "How much does basement waterproofing cost?",
        answer:
          "Interior basement waterproofing in the New York area typically ranges from $3,000 to $10,000 depending on the size of the basement and the system installed. Exterior waterproofing, which involves excavation, generally costs more — ranging from $8,000 to $20,000 or higher. We provide free assessments and detailed estimates.",
      },
      {
        question: "Is interior or exterior waterproofing better?",
        answer:
          "Exterior waterproofing prevents water from ever reaching the foundation wall and is generally the most effective long-term solution. However, it requires excavation and is more expensive. Interior systems manage water that has already entered and redirect it to a sump pump. In many cases, a combination of both methods provides the best protection.",
      },
    ],
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
    faqs: [
      {
        question: "What is the best paver brand for a patio in New York?",
        answer:
          "Cambridge, Nicolock, and Unilock are all excellent choices for New York's freeze-thaw climate. As certified installers for all three, Bonardi Construction can help you compare color options, textures, and warranty coverage to find the best fit for your project and budget.",
      },
      {
        question: "How long does a paver patio installation take?",
        answer:
          "A typical residential paver patio takes 3 to 7 days depending on size, base preparation, and design complexity. This includes excavation, base compaction, paver installation, and joint sanding. Bonardi Construction provides a detailed timeline during the estimate process.",
      },
    ],
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
    faqs: [
      {
        question: "Do I need a permit for demolition in NYC?",
        answer:
          "Yes. All demolition work in New York City requires a permit from the Department of Buildings. Full demolitions also require asbestos abatement certification and proper utility disconnection. Bonardi Construction handles all permit filings and regulatory requirements.",
      },
      {
        question: "How long does a residential demolition take?",
        answer:
          "A typical residential demolition in Queens takes 3 to 10 days depending on the size of the structure and site conditions. This includes debris removal and site cleanup. We coordinate dumpsters and disposal to keep your project moving efficiently.",
      },
    ],
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
    faqs: [
      {
        question: "What are signs of poor drainage around my house?",
        answer:
          "Common signs include standing water in the yard after rain, water pooling against the foundation, damp or wet basement walls, and erosion along the foundation perimeter. If you notice any of these, a drainage assessment can identify the problem and the most effective solution.",
      },
      {
        question: "What is a French drain and do I need one?",
        answer:
          "A French drain is a gravel-filled trench with a perforated pipe that redirects groundwater away from your foundation. You may need one if you experience recurring basement moisture, yard flooding, or hydrostatic pressure against your foundation walls.",
      },
    ],
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
    faqs: [
      {
        question: "Do I need excavation permits in NYC?",
        answer:
          "Yes. Excavation work in New York City requires permits from the Department of Buildings, and utility locates must be completed before any digging begins. Bonardi Construction coordinates all permit filings and utility clearances.",
      },
      {
        question: "How deep can you excavate for a basement?",
        answer:
          "Excavation depth depends on the project requirements and soil conditions. For basements, we typically excavate 8 to 10 feet. Our experienced operators work with structural engineers to ensure safe, properly shored excavations.",
      },
    ],
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
    faqs: [
      {
        question: "What does a construction manager do?",
        answer:
          "A construction manager oversees all aspects of a construction project on behalf of the owner, including budgeting, scheduling, subcontractor coordination, quality control, and communication. They serve as your single point of contact throughout the project.",
      },
      {
        question: "When should I hire a construction manager vs. a general contractor?",
        answer:
          "A construction manager is ideal when you want professional oversight and transparency on larger or more complex projects. A general contractor is the right choice when you want one company to handle all work directly. Bonardi Construction offers both services.",
      },
    ],
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
    faqs: [
      {
        question: "How long does a commercial office buildout take?",
        answer:
          "A typical commercial office buildout ranges from 4 to 12 weeks depending on the size and complexity of the space. Factors like permit approval, custom millwork, and specialty finishes can extend the timeline. Bonardi Construction provides a detailed schedule during pre-construction planning.",
      },
      {
        question: "Can you work during off-hours to minimize business disruption?",
        answer:
          "Yes. We routinely schedule commercial buildout work during evenings and weekends to minimize disruption to adjacent tenants and ongoing business operations. We coordinate with building management to ensure smooth logistics.",
      },
    ],
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
    faqs: [
      {
        question: "What type of framing is used in NYC residential construction?",
        answer:
          "Most residential construction in NYC uses wood platform framing, though steel stud framing is common in commercial and multi-family buildings. Bonardi Construction works with both systems and follows all NYC building code requirements for structural framing.",
      },
      {
        question: "How long does framing take for a home addition?",
        answer:
          "Framing for a typical home addition takes 1 to 3 weeks depending on the size and complexity. This includes wall framing, floor and ceiling joists, headers, and sheathing. Proper framing is critical for structural integrity and must pass inspection before work can proceed.",
      },
    ],
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
    faqs: [
      {
        question: "What is the most durable flooring for a high-traffic area?",
        answer:
          "Porcelain tile and luxury vinyl plank (LVP) are the most durable options for high-traffic areas. Both resist scratches, moisture, and heavy use. Hardwood is also durable but requires periodic refinishing. Bonardi Construction helps you select the best material for your space and lifestyle.",
      },
      {
        question: "Do you install radiant heat flooring?",
        answer:
          "Yes. We install electric and hydronic radiant heat systems under tile, stone, and engineered flooring. Radiant heat provides comfortable, even warmth and is especially popular in bathroom and kitchen renovations.",
      },
    ],
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
    faqs: [
      {
        question: "What size Generac generator do I need for my home?",
        answer:
          "Generator sizing depends on the number of circuits and appliances you want to power during an outage. A 22kW unit covers most homes, while smaller 10-16kW units can handle essential circuits. Bonardi Construction performs a load analysis to recommend the right size for your needs.",
      },
      {
        question: "How much does a Generac generator installation cost?",
        answer:
          "A fully installed Generac home standby generator typically ranges from $5,000 to $15,000 including the unit, automatic transfer switch, gas line connection, and permit fees. We provide detailed quotes after evaluating your property and electrical setup.",
      },
    ],
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
    faqs: [
      {
        question: "How do I resolve a DOT sidewalk violation in NYC?",
        answer:
          "You need to hire a licensed contractor to replace the damaged sidewalk flags to DOT specifications, then schedule a re-inspection. Bonardi Construction handles the entire process including permit filing, concrete work, and DOT sign-off.",
      },
      {
        question: "How long do I have to fix a sidewalk violation?",
        answer:
          "Property owners typically receive 45 to 75 days to repair sidewalk violations, depending on the type of notice. Failing to act can result in the city performing the work and billing you at a premium. Contact Bonardi Construction promptly to avoid additional costs.",
      },
    ],
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
    faqs: [
      {
        question: "How often should asphalt be sealcoated?",
        answer:
          "Asphalt should be sealcoated every 2 to 3 years to maintain protection against UV damage, water penetration, and oil stains. Regular sealcoating can double the life of your asphalt surface.",
      },
      {
        question: "Can you sealcoat asphalt with existing cracks?",
        answer:
          "Yes, but cracks should be filled before sealcoating for the best results. Bonardi Construction fills all cracks and treats oil spots before applying sealer to ensure a proper bond and long-lasting finish.",
      },
    ],
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
    faqs: [
      {
        question: "What is asphalt milling used for?",
        answer:
          "Asphalt milling removes the top layer of deteriorated asphalt to create a clean, level surface for new overlay. It is faster and more cost-effective than full removal and is commonly used for parking lot and road resurfacing projects.",
      },
      {
        question: "Can milled asphalt be recycled?",
        answer:
          "Yes. Reclaimed asphalt pavement (RAP) from milling is commonly recycled and reused in new asphalt mixes. Bonardi Construction coordinates proper disposal and recycling of all milled material.",
      },
    ],
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
    faqs: [
      {
        question: "How long does parking lot striping last?",
        answer:
          "Parking lot striping typically lasts 1 to 2 years in high-traffic areas and up to 3 years in lower-traffic areas. Restriping after sealcoating ensures crisp, visible lines and ADA compliance.",
      },
      {
        question: "Do you handle ADA-compliant striping and signage?",
        answer:
          "Yes. Bonardi Construction installs ADA-compliant handicap spaces, access aisles, crosswalk markings, and signage as required by federal and local regulations.",
      },
    ],
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
    faqs: [
      {
        question: "Why are parapet walls a concern in NYC?",
        answer:
          "Deteriorating parapet walls pose a safety hazard and can trigger DOB violations. NYC Local Law 11 requires periodic facade inspections, and crumbling parapet walls are among the most common findings. Bonardi Construction repairs and rebuilds parapet walls to full code compliance.",
      },
      {
        question: "How much does parapet wall repair cost?",
        answer:
          "Parapet wall repair costs vary based on the extent of damage and building height. Minor repointing and coping replacement may start around $5,000, while a full rebuild can range significantly higher. We provide detailed estimates after an on-site inspection.",
      },
    ],
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
    faqs: [
      {
        question: "What is included in a construction consultation?",
        answer:
          "A construction consultation includes a site visit, project feasibility assessment, preliminary cost estimating, and guidance on permits, code compliance, and scope of work. It is designed to help you make informed decisions before committing to a full project.",
      },
      {
        question: "Is a construction consultation free?",
        answer:
          "Bonardi Construction offers an initial consultation at no charge for most residential and commercial projects. Contact us at 718.762.3400 to schedule your appointment.",
      },
    ],
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
    faqs: [
      {
        question: "How long does a bathroom remodel take?",
        answer:
          "A full bathroom renovation typically takes 3 to 6 weeks depending on the scope. Gut renovations involving plumbing relocation and custom tile work take longer than cosmetic updates. Bonardi Construction provides a detailed timeline during the estimate process.",
      },
      {
        question: "Do I need waterproofing in my bathroom remodel?",
        answer:
          "Yes. Proper waterproofing behind shower walls and under tile floors is essential to prevent moisture damage and mold growth. Bonardi Construction installs membrane waterproofing systems in every bathroom renovation as a standard practice.",
      },
    ],
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
    faqs: [
      {
        question: "What type of dormer adds the most space?",
        answer:
          "A shed dormer provides the most additional usable square footage because it extends across the full width of the roof with a flat, sloped ceiling. Gable dormers add less space but provide an attractive architectural accent. Bonardi Construction builds both types to suit your home and goals.",
      },
      {
        question: "Do I need a permit for a dormer addition?",
        answer:
          "Yes. Dormer additions in NYC require a Department of Buildings permit and must comply with zoning and building code requirements. Bonardi Construction handles all permit filings, architectural drawings, and inspections.",
      },
    ],
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
    faqs: [
      {
        question: "How much does a kitchen remodel cost in Queens?",
        answer:
          "Kitchen remodel costs in Queens typically range from $25,000 for a basic renovation to $75,000 or more for a full gut renovation with custom cabinetry and high-end finishes. Bonardi Construction provides detailed estimates based on your specific design and material selections.",
      },
      {
        question: "Can you reconfigure the kitchen layout during a remodel?",
        answer:
          "Yes. We routinely reconfigure kitchen layouts including moving plumbing, electrical, and gas lines to create a more functional space. Layout changes require proper permits and inspections, which we handle as part of the project.",
      },
    ],
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
    faqs: [
      {
        question: "Can you pave a parking lot while the business stays open?",
        answer:
          "Yes. Bonardi Construction regularly phases commercial paving projects to keep portions of the lot open during work. We develop traffic management plans to minimize disruption to your customers and operations.",
      },
      {
        question: "How thick should commercial asphalt be?",
        answer:
          "Commercial parking lots typically require 2.5 to 4 inches of asphalt over a properly compacted aggregate base. Heavy-traffic areas such as truck routes may require additional thickness. We engineer each project based on expected traffic loads.",
      },
    ],
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
    faqs: [
      {
        question: "What is a Level 5 drywall finish?",
        answer:
          "A Level 5 finish is the highest quality drywall finish, where a skim coat of joint compound is applied over the entire surface before painting. It eliminates any visible imperfections and is recommended for areas with critical lighting or high-gloss paint.",
      },
      {
        question: "Can you match existing wall textures?",
        answer:
          "Yes. Bonardi Construction matches existing textures including orange peel, knockdown, skip trowel, and smooth finishes for seamless repairs and additions. We test match on a sample area before completing the full job.",
      },
    ],
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
    faqs: [
      {
        question: "Can damaged brownstone be restored or does it need replacement?",
        answer:
          "In many cases, damaged brownstone can be restored using specialized patching compounds and dutchman repairs rather than full replacement. Bonardi Construction evaluates the extent of damage and recommends the most cost-effective approach that preserves the building's character.",
      },
      {
        question: "Do you work on landmark-designated buildings?",
        answer:
          "Yes. Bonardi Construction performs masonry restoration on landmark-designated buildings and follows all Landmarks Preservation Commission requirements for materials, techniques, and approvals.",
      },
    ],
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
    faqs: [
      {
        question: "Is concrete leveling a permanent fix?",
        answer:
          "Concrete leveling provides a long-lasting repair that typically holds for 8 to 10 years or longer, depending on soil conditions. If the underlying soil issue is also corrected, the repair can be effectively permanent.",
      },
      {
        question: "What is the difference between mudjacking and foam injection?",
        answer:
          "Mudjacking uses a cement-based slurry pumped under the slab, while polyurethane foam injection uses expanding foam. Foam is lighter, cures faster, and requires smaller injection holes. Both methods are effective, and we recommend the best option based on your specific situation.",
      },
    ],
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
    faqs: [
      {
        question: "How do I know if my soil needs stabilization?",
        answer:
          "Signs of unstable soil include foundation settlement, cracking slabs, heaving sidewalks, and recurring drainage problems. A geotechnical assessment can confirm soil conditions and guide the right stabilization approach.",
      },
      {
        question: "What soil stabilization methods do you use?",
        answer:
          "Bonardi Construction uses chemical stabilization, compaction grouting, and soil amendment techniques depending on the site conditions. We coordinate with geotechnical engineers to select the most effective method for each project.",
      },
    ],
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
    faqs: [
      {
        question: "What is underpinning and when is it needed?",
        answer:
          "Underpinning strengthens or deepens an existing foundation. It is needed when a foundation has settled, when adjacent excavation threatens stability, or when additional load capacity is required for a renovation or addition.",
      },
      {
        question: "Is underpinning disruptive to building operations?",
        answer:
          "Underpinning is performed in carefully planned sequences to maintain structural stability. While some disruption is unavoidable, Bonardi Construction minimizes impact through phased work and continuous structural monitoring.",
      },
    ],
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
    faqs: [
      {
        question: "How often should a commercial parking lot be maintained?",
        answer:
          "We recommend annual crack sealing, sealcoating every 2 to 3 years, and restriping as needed. A proactive maintenance program costs significantly less than reactive repairs and extends the life of your pavement by years.",
      },
      {
        question: "Do you offer seasonal maintenance contracts?",
        answer:
          "Yes. Bonardi Construction offers annual and multi-year maintenance contracts for commercial properties. Our programs include scheduled inspections, crack sealing, sealcoating, and striping to keep your lot in top condition year-round.",
      },
    ],
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
