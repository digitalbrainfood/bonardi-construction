import Link from "next/link";

const serviceCategories = [
  {
    category: "Residential",
    color: "#C9A44A",
    services: [
      {
        name: "Home Additions & Extensions",
        href: "/services/home-additions-extensions",
        desc: "Expand your living space with precision-built additions, dormers, and room extensions.",
        icon: "⬜",
      },
      {
        name: "Roofing Services",
        href: "/services/roofing-services",
        desc: "Expert installation, repair, and replacement for all roofing systems.",
        icon: "⬡",
      },
      {
        name: "Foundation Repair",
        href: "/services/foundation-repair-restoration",
        desc: "Structural restoration and waterproofing for lasting stability.",
        icon: "◧",
      },
      {
        name: "Flooring",
        href: "/services/flooring",
        desc: "Hardwood, tile, and specialty flooring installed to perfection.",
        icon: "⬦",
      },
      {
        name: "Framing",
        href: "/services/framing",
        desc: "Structural framing for new builds and renovations.",
        icon: "⬛",
      },
      {
        name: "Generac Generators",
        href: "/services/generac-generators",
        desc: "Standby generator installation and service for uninterrupted power.",
        icon: "⚡",
      },
    ],
  },
  {
    category: "Exterior & Site",
    color: "#9E7E32",
    services: [
      {
        name: "Asphalt Paving & Sealcoating",
        href: "/services/asphalt",
        desc: "Driveways, parking lots, milling, and protective sealcoating.",
        icon: "◼",
      },
      {
        name: "Concrete & Blacktop",
        href: "/services/concrete",
        desc: "Foundations, driveways, walkways, and site-grade concrete work.",
        icon: "▣",
      },
      {
        name: "Masonry & Brick Pointing",
        href: "/services/masonry-brick-pointing",
        desc: "Tuckpointing, weatherproofing, and complete masonry restoration.",
        icon: "▩",
      },
      {
        name: "Hardscaping",
        href: "/services/hardscaping",
        desc: "Patios, retaining walls, and landscape structures.",
        icon: "◩",
      },
      {
        name: "Sidewalk Repairs",
        href: "/services/sidewalks",
        desc: "DOT violation repairs and new sidewalk installation.",
        icon: "⬐",
      },
      {
        name: "Drainage Solutions",
        href: "/services/drainage",
        desc: "French drains, catch basins, and stormwater management.",
        icon: "↓",
      },
    ],
  },
  {
    category: "Commercial & Specialty",
    color: "#B04A2A",
    services: [
      {
        name: "New Construction",
        href: "/services/new-construction",
        desc: "Full-scope ground-up builds for residential and commercial clients.",
        icon: "◫",
      },
      {
        name: "Construction Management",
        href: "/services/construction-management",
        desc: "End-to-end project oversight from planning through punch list.",
        icon: "◈",
      },
      {
        name: "Office Buildouts",
        href: "/services/office-buildouts",
        desc: "Commercial interior builds tailored to your business needs.",
        icon: "▦",
      },
      {
        name: "Demolition",
        href: "/services/demolition",
        desc: "Selective and full-site demolition, safely executed.",
        icon: "✕",
      },
      {
        name: "Fire Damage Restoration",
        href: "/services/fire-damage-restoration",
        icon: "◉",
      },
      {
        name: "Sheetrock & Painting",
        href: "/services/sheetrock-painting",
        desc: "Professional drywall, skim coating, and interior painting.",
        icon: "▤",
      },
      {
        name: "Water & Mold Restoration",
        href: "/services/water-and-mold-restoration",
        desc: "Extraction, remediation, and structural repair after water damage.",
        icon: "◎",
      },
    ],
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-obsidian" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">What We Build</span>
            </div>
            <h2 className="font-display font-bold text-display-xl text-ivory mb-4">
              Comprehensive Services,
              <br />
              <em className="italic text-gold">Unmatched Quality.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="font-body text-ash text-base leading-relaxed">
              From ground-up builds to precision repairs, our licensed team handles every aspect
              of your project with decades of hands-on expertise across the New York metro area.
            </p>
          </div>
        </div>

        {/* Service categories */}
        <div className="space-y-16">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-8" style={{ backgroundColor: cat.color }} />
                <h3 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-ash">
                  {cat.category}
                </h3>
                <div className="flex-1 h-px bg-slate" />
              </div>

              {/* Service grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate">
                {cat.services.map((service) => (
                  <Link key={service.name} href={service.href} className="group block bg-obsidian hover:bg-carbon transition-colors duration-300">
                    <div className="p-7 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-stone group-hover:text-gold text-xl transition-colors duration-300 font-mono">
                          {service.icon}
                        </span>
                        <svg
                          className="w-4 h-4 text-stone group-hover:text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <h4 className="font-body font-semibold text-ivory text-base mb-3 group-hover:text-gold transition-colors duration-300">
                        {service.name}
                      </h4>
                      <p className="font-body text-cement text-sm leading-relaxed flex-1">{service.desc}</p>
                      <div
                        className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-obsidian px-8 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Discuss Your Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
