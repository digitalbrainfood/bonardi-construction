import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAreaBySlug, areas } from "@/lib/areas-data";
import { services } from "@/lib/services-data";
import QuoteForm from "@/components/QuoteForm";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getAreaBySlug(params.slug);
  if (!area) return {};
  return {
    title: `General Contractor in ${area.name}`,
    description: `Bonardi Construction — licensed general contractor serving ${area.name}. 30+ years of residential and commercial construction experience.`,
    alternates: { canonical: `/areas-we-serve/${params.slug}` },
  };
}

const featuredServices = [
  "asphalt", "concrete", "roofing-services", "masonry-brick-pointing",
  "new-construction", "home-additions-extensions", "foundation-repair-restoration",
  "hardscaping", "waterproofing", "demolition", "drainage", "sidewalks",
];

export default function AreaDetailPage({ params }: Props) {
  const area = getAreaBySlug(params.slug);
  if (!area) notFound();

  const displayedServices = featuredServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean)
    .slice(0, 12);

  return (
    <>
      {/* Header */}
      <section className="pt-10 pb-16 bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-brand/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-xs font-mono tracking-wide transition-colors">
              HOME
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <Link href="/areas-we-serve" className="text-gray-400 hover:text-gray-600 text-xs font-mono tracking-wide transition-colors">
              AREAS WE SERVE
            </Link>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-brand text-xs font-mono tracking-wide uppercase">
              {area.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">{area.county}</span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-black mb-3">
            General Contractor in {area.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main content */}
            <div className="lg:col-span-7 space-y-10">
              <p className="font-body text-gray-600 text-lg leading-relaxed">{area.description}</p>

              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-6 h-px bg-brand" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700">
                    Services Available in {area.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayedServices.map((service) => (
                    <Link
                      key={service!.slug}
                      href={`/services/${service!.slug}`}
                      className="group bg-white border border-gray-200 rounded-lg hover:shadow-card-hover transition-all duration-300 p-5 flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-brand rotate-45 flex-shrink-0" />
                      <span className="font-body text-gray-800 text-sm group-hover:text-brand transition-colors">
                        {service!.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              {/* Quote form */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="section-label mb-4">Request a Quote</p>
                <p className="font-body text-gray-600 text-sm mb-4">
                  Get a free estimate for your project in {area.name}.
                </p>
                <QuoteForm variant="compact" />
              </div>

              {/* Why Choose Bonardi */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                <p className="section-label">Why Choose Bonardi</p>
                {[
                  "30+ years of licensed experience",
                  "NYC, Nassau & Suffolk licensed",
                  "Lead-Safe Certified Firm",
                  "Full project management",
                  "Transparent pricing, no surprises",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-brand text-xs">&#9670;</span>
                    <span className="text-gray-600 text-sm font-body">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Serving {area.name} and beyond
            </h2>
            <p className="font-body text-white/80">
              Call us at{" "}
              <a href="tel:7187623400" className="text-accent hover:text-accent-light transition-colors">
                718.762.3400
              </a>{" "}
              to discuss your project.
            </p>
          </div>
          <Link
            href="/areas-we-serve"
            className="flex-shrink-0 flex items-center gap-3 border border-white/30 hover:border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-body font-medium text-base tracking-wide transition-all duration-300"
          >
            All Service Areas
          </Link>
        </div>
      </section>
    </>
  );
}
