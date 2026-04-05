import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAreaBySlug, areas } from "@/lib/areas-data";
import { services } from "@/lib/services-data";

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
      <section className="pt-10 pb-16 bg-carbon border-b border-slate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              HOME
            </Link>
            <span className="text-slate text-xs">/</span>
            <Link href="/areas-we-serve" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              AREAS WE SERVE
            </Link>
            <span className="text-slate text-xs">/</span>
            <span className="text-gold text-xs font-mono tracking-wide uppercase">
              {area.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">{area.county}</span>
          </div>
          <h1 className="font-display font-bold text-display-lg text-ivory mb-3">
            General Contractor in {area.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main content */}
            <div className="lg:col-span-7 space-y-10">
              <p className="font-body text-ash text-lg leading-relaxed">{area.description}</p>

              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-6 h-px bg-gold" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-ash">
                    Services Available in {area.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate">
                  {displayedServices.map((service) => (
                    <Link
                      key={service!.slug}
                      href={`/services/${service!.slug}`}
                      className="group bg-obsidian hover:bg-carbon transition-colors duration-300 p-5 flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-gold rotate-45 flex-shrink-0" />
                      <span className="font-body text-ivory text-sm group-hover:text-gold transition-colors">
                        {service!.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-charcoal border border-slate p-8">
                <p className="section-label mb-5">Request a Quote</p>
                <p className="font-body text-ash text-sm leading-relaxed mb-6">
                  Get a free, no-obligation estimate for your project in {area.name}.
                  We respond within one business day.
                </p>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-obsidian w-full py-4 font-body font-semibold text-base tracking-wide transition-all duration-300 mb-4"
                >
                  Get a Free Quote
                </Link>
                <a
                  href="tel:7187623400"
                  className="flex items-center justify-center gap-3 border border-slate hover:border-gold text-ivory hover:text-gold w-full py-4 font-body font-medium text-sm tracking-wide transition-all duration-300"
                >
                  Call 718.762.3400
                </a>
              </div>

              <div className="bg-carbon border border-slate/60 p-6 space-y-4">
                <p className="section-label">Why Choose Bonardi</p>
                {[
                  "30+ years of licensed experience",
                  "NYC, Nassau & Suffolk licensed",
                  "Lead-Safe Certified Firm",
                  "Full project management",
                  "Transparent pricing, no surprises",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-gold text-xs">◆</span>
                    <span className="text-ash text-sm font-body">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal border-t border-slate">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-ivory mb-2">
              Serving {area.name} and beyond
            </h2>
            <p className="font-body text-ash">
              Call us at{" "}
              <a href="tel:7187623400" className="text-gold hover:text-gold-light transition-colors">
                718.762.3400
              </a>{" "}
              to discuss your project.
            </p>
          </div>
          <Link
            href="/areas-we-serve"
            className="flex-shrink-0 flex items-center gap-3 border border-slate hover:border-gold text-ash hover:text-gold px-8 py-4 font-body font-medium text-base tracking-wide transition-all duration-300"
          >
            All Service Areas
          </Link>
        </div>
      </section>
    </>
  );
}
