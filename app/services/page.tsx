import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full list of general contracting services from Bonardi Construction — asphalt, concrete, roofing, masonry, new construction, and 15 more across Queens, Brooklyn, and Long Island.",
  alternates: { canonical: "/services" },
};

type Service = {
  name: string;
  slug: string;
  desc: string;
  tags: string[];
};

const categories: { label: string; color: string; services: Service[] }[] = [
  {
    label: "Residential",
    color: "#0055A5",
    services: [
      {
        name: "Home Additions & Extensions",
        slug: "home-additions-extensions",
        desc: "Expand your living space with custom additions, dormers, and room extensions built to match your home's existing character.",
        tags: ["Residential", "Structural"],
      },
      {
        name: "New Construction",
        slug: "new-construction",
        desc: "Ground-up custom home builds from foundation to finish, delivered on schedule with transparent communication throughout.",
        tags: ["Residential", "Commercial"],
      },
      {
        name: "Roofing Services",
        slug: "roofing-services",
        desc: "Expert roof installation, repair, and replacement using premium materials with full labor warranty.",
        tags: ["Residential", "Commercial"],
      },
      {
        name: "Foundation Repair & Restoration",
        slug: "foundation-repair-restoration",
        desc: "Structural foundation repair, waterproofing, and crack injection for lasting stability and protection.",
        tags: ["Structural"],
      },
      {
        name: "Framing",
        slug: "framing",
        desc: "Precision structural framing for new builds, additions, and renovations — the backbone of every great structure.",
        tags: ["Structural"],
      },
      {
        name: "Flooring",
        slug: "flooring",
        desc: "Hardwood, engineered, tile, and specialty flooring installed with meticulous attention to detail.",
        tags: ["Interior"],
      },
      {
        name: "Generac Generators",
        slug: "generac-generators",
        desc: "Authorized Generac dealer and certified installer — standby generator systems for homes and businesses.",
        tags: ["Specialty"],
      },
      {
        name: "Dormer Additions",
        slug: "dormer-additions",
        desc: "Shed, gable, and full dormers that add space, light, and value to your home.",
        tags: ["Residential", "Structural"],
      },
      {
        name: "Kitchen Remodeling",
        slug: "kitchen-remodeling",
        desc: "Full-service kitchen renovations from layout to cabinetry, countertops, and finishes.",
        tags: ["Residential", "Interior"],
      },
      {
        name: "Bathroom Remodeling",
        slug: "bathroom-remodeling",
        desc: "Custom bathroom renovations with expert tile work and waterproofing.",
        tags: ["Residential", "Interior"],
      },
      {
        name: "Sheetrock & Painting",
        slug: "sheetrock-painting",
        desc: "Professional drywall installation, skim coating, and interior painting services.",
        tags: ["Interior"],
      },
    ],
  },
  {
    label: "Exterior & Site Work",
    color: "#003D7A",
    services: [
      {
        name: "Asphalt Services",
        slug: "asphalt",
        desc: "Complete asphalt solutions including new paving, milling, pothole repair, and protective sealcoating.",
        tags: ["Exterior", "Commercial"],
      },
      {
        name: "Asphalt Sealcoating",
        slug: "asphalt-sealcoating",
        desc: "Professional sealcoating to protect and extend the life of driveways and parking lots.",
        tags: ["Exterior"],
      },
      {
        name: "Asphalt Milling",
        slug: "asphalt-milling",
        desc: "Cold milling to remove deteriorated asphalt layers in preparation for resurfacing.",
        tags: ["Commercial", "Exterior"],
      },
      {
        name: "Concrete, Blacktop & Striping",
        slug: "concrete",
        desc: "Foundations, driveways, walkways, curbs, and parking lot striping — site-grade concrete and blacktop work.",
        tags: ["Exterior", "Commercial"],
      },
      {
        name: "Masonry, Brick Pointing & Weatherproofing",
        slug: "masonry-brick-pointing",
        desc: "Tuckpointing, brick restoration, weatherproofing, and full masonry repair for long-term structural integrity.",
        tags: ["Exterior", "Restoration"],
      },
      {
        name: "Hardscaping",
        slug: "hardscaping",
        desc: "Patios, retaining walls, walkways, and outdoor structures using Cambridge, Nicolock, and Unilock products.",
        tags: ["Exterior", "Residential"],
      },
      {
        name: "Sidewalks",
        slug: "sidewalks",
        desc: "DOT violation repairs, new sidewalk installation, and concrete replacement to city compliance standards.",
        tags: ["Exterior", "Compliance"],
      },
      {
        name: "Drainage",
        slug: "drainage",
        desc: "French drains, catch basins, dry wells, and stormwater management systems.",
        tags: ["Exterior", "Site"],
      },
      {
        name: "Excavation",
        slug: "excavation",
        desc: "Site excavation, grading, and soil removal for residential and commercial projects of all scales.",
        tags: ["Site Work"],
      },
      {
        name: "Masonry Restoration",
        slug: "masonry-restoration",
        desc: "Historic masonry, brownstone, and limestone facade restoration with authentic material matching.",
        tags: ["Exterior", "Restoration"],
      },
      {
        name: "Parapet Wall Repair & Rebuild",
        slug: "parapet-wall-repair-rebuild",
        desc: "Structural parapet wall restoration, coping replacement, and DOB violation resolution.",
        tags: ["Exterior", "Restoration"],
      },
      {
        name: "Concrete Leveling",
        slug: "concrete-leveling",
        desc: "Fix sunken and uneven concrete without full replacement using mudjacking and foam injection.",
        tags: ["Exterior"],
      },
      {
        name: "Soil Stabilization",
        slug: "soil-stabilization",
        desc: "Strengthen weak soil to prevent foundation settlement and pavement failure.",
        tags: ["Site Work", "Structural"],
      },
    ],
  },
  {
    label: "Commercial & Specialty",
    color: "#FBB62E",
    services: [
      {
        name: "Construction Management",
        slug: "construction-management",
        desc: "End-to-end project oversight — budgeting, scheduling, subcontractor coordination, and quality control.",
        tags: ["Commercial", "Residential"],
      },
      {
        name: "Office Buildouts",
        slug: "office-buildouts",
        desc: "Commercial interior construction tailored to your business, from shell to fully finished workspace.",
        tags: ["Commercial"],
      },
      {
        name: "Demolition",
        slug: "demolition",
        desc: "Selective and full-site demolition, safely managed with full debris removal and site cleanup.",
        tags: ["Commercial", "Residential"],
      },
      {
        name: "Fire Damage Restoration",
        slug: "fire-damage-restoration",
        desc: "Emergency board-up, debris removal, structural repair, and full restoration after fire damage.",
        tags: ["Restoration", "Emergency"],
      },
      {
        name: "Water & Mold Restoration",
        slug: "water-and-mold-restoration",
        desc: "Water extraction, mold remediation, structural drying, and complete restoration after water damage.",
        tags: ["Restoration", "Emergency"],
      },
      {
        name: "Waterproofing",
        slug: "waterproofing",
        desc: "Interior and exterior waterproofing systems for basements, foundations, and roofs.",
        tags: ["Exterior", "Structural"],
      },
      {
        name: "Construction Consultation",
        slug: "construction-consultation",
        desc: "Expert project planning, feasibility assessment, and cost guidance before you break ground.",
        tags: ["Commercial", "Residential"],
      },
      {
        name: "Commercial Milling & Paving",
        slug: "commercial-milling-paving",
        desc: "Large-scale milling and paving for commercial parking lots and roadways.",
        tags: ["Commercial", "Exterior"],
      },
      {
        name: "Commercial Underpinning",
        slug: "commercial-underpinning",
        desc: "Foundation strengthening and depth extension for commercial structures.",
        tags: ["Commercial", "Structural"],
      },
      {
        name: "Commercial Parking Lot Maintenance",
        slug: "commercial-parking-lot-maintenance",
        desc: "Comprehensive parking lot maintenance programs including crack sealing, striping, and sealcoating.",
        tags: ["Commercial", "Exterior"],
      },
    ],
  },
];

export default function ServicesPage() {
  const allServices = categories.flatMap((cat) => cat.services);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bonardi Construction Services",
    numberOfItems: allServices.length,
    itemListElement: allServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `https://bonardiconst.com/services/${service.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      {/* Header */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">What We Do</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-black">
              Every Service
              <br />
              <em className="italic text-brand">Under One Roof.</em>
            </h1>
            <p className="font-body text-gray-600 text-base leading-relaxed">
              20+ services spanning residential, commercial, exterior, and specialty work.
              One licensed team. 30 years of experience. The full scope of your project — handled.
            </p>
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {categories.map((cat) => (
            <div key={cat.label}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 rounded-sm" style={{ backgroundColor: cat.color }} />
                <div>
                  <p className="section-label">{cat.label}</p>
                  <p className="text-gray-500 text-xs font-body mt-0.5">{cat.services.length} services</p>
                </div>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group bg-white border border-gray-200 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-gray-600 bg-gray-100 rounded px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-brand -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-2 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                    <h3 className="font-body font-semibold text-black text-base mb-3 group-hover:text-brand transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="font-body text-gray-500 text-sm leading-relaxed flex-1">{service.desc}</p>

                    <div
                      className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded"
                      style={{ backgroundColor: cat.color }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-black mb-2">
              Don&apos;t see what you need?
            </h2>
            <p className="font-body text-gray-600">
              Call us at{" "}
              <a href="tel:7187623400" className="text-brand hover:text-brand-dark transition-colors">
                718.762.3400
              </a>{" "}
              — we handle more than what&apos;s listed.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 flex items-center gap-3 border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Request a Free Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
