import Link from "next/link";

const serviceCategories = [
  {
    category: "Residential",
    color: "#0055A5",
    services: [
      {
        name: "Home Additions & Extensions",
        href: "/services/home-additions-extensions",
        desc: "Expand your living space with precision-built additions and extensions.",
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
        desc: "Standby generator installation for uninterrupted power.",
        icon: "⚡",
      },
    ],
  },
  {
    category: "Exterior & Site",
    color: "#1a6db5",
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
        icon: "▬",
      },
      {
        name: "Drainage Solutions",
        href: "/services/drainage",
        desc: "French drains, catch basins, and stormwater management.",
        icon: "▽",
      },
    ],
  },
  {
    category: "Commercial & Specialty",
    color: "#FBB62E",
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
        desc: "Complete structural repair and cleanup after fire damage.",
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
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-0.5 bg-brand" />
              <span className="font-body text-sm font-semibold tracking-[0.15em] uppercase text-brand">
                What We Build
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-black leading-tight">
              Comprehensive Services,
              <br />
              <span className="text-brand">Unmatched Quality.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="font-body text-gray-500 text-base leading-relaxed">
              From ground-up builds to precision repairs, our licensed team
              handles every aspect of your project with decades of hands-on
              expertise across the New York metro area.
            </p>
          </div>
        </div>

        {/* Service categories */}
        <div className="space-y-20">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="w-1.5 h-8 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-800">
                  {cat.category}
                </h3>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Service grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group relative block bg-white border border-gray-200 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="text-xl font-mono leading-none"
                          style={{ color: cat.color }}
                        >
                          {service.icon}
                        </span>
                        <svg
                          className="w-4 h-4 text-gray-300 group-hover:text-brand opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                      <h4 className="font-body font-semibold text-black text-base mb-2 group-hover:text-brand transition-colors duration-300">
                        {service.name}
                      </h4>
                      <p className="font-body text-gray-500 text-sm leading-relaxed flex-1">
                        {service.desc}
                      </p>
                    </div>
                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ backgroundColor: cat.color }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-lg px-8 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Discuss Your Project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
