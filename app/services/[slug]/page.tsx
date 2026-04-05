import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getRelatedServices, services } from "@/lib/services-data";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `${service.tagline} — Bonardi Construction serves Queens, Brooklyn, Nassau & Suffolk County.`,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = getRelatedServices(service.relatedSlugs);

  return (
    <>
      {/* Breadcrumb + header */}
      <section className="pt-10 pb-16 bg-carbon border-b border-slate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              HOME
            </Link>
            <span className="text-slate text-xs">/</span>
            <Link href="/services" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              SERVICES
            </Link>
            <span className="text-slate text-xs">/</span>
            <span className="text-gold text-xs font-mono tracking-wide uppercase">
              {service.name}
            </span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <div className="flex gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-stone border border-slate px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="font-display font-bold text-display-lg text-ivory mb-3">
                {service.name}
              </h1>
              <p className="font-body text-gold text-base font-medium">{service.tagline}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <a
                href="tel:7187623400"
                className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-obsidian px-7 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                718.762.3400
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Content left */}
            <div className="lg:col-span-7 space-y-12">
              {/* Intro */}
              <div>
                <p className="font-body text-ash text-lg leading-relaxed">{service.intro}</p>
              </div>

              {/* What's included */}
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-6 h-px bg-gold" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-ash">
                    What&apos;s Included
                  </h2>
                </div>
                <ul className="space-y-4">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-gold rotate-45 mt-2 flex-shrink-0" />
                      <span className="font-body text-ivory text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Bonardi */}
              <div className="border-l-2 border-gold pl-6 bg-charcoal -ml-6 py-6 pr-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-gold" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-ash">
                    The Bonardi Advantage
                  </h2>
                </div>
                <p className="font-body text-ash text-base leading-relaxed">{service.whyUs}</p>
              </div>

              {/* Image placeholder */}
              <div className="aspect-video bg-charcoal border border-slate flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                <div className="text-center relative z-10">
                  <p className="text-stone text-xs font-mono tracking-widest mb-1">PROJECT PHOTOS</p>
                  <p className="text-slate text-xs font-body">Upload {service.name.toLowerCase()} project images here</p>
                </div>
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" />
              </div>
            </div>

            {/* Sidebar right */}
            <div className="lg:col-span-5 space-y-8">
              {/* Quote card */}
              <div className="bg-charcoal border border-slate p-8">
                <p className="section-label mb-5">Request a Quote</p>
                <p className="font-body text-ash text-sm leading-relaxed mb-6">
                  Get a free, no-obligation estimate for your {service.name.toLowerCase()} project.
                  We respond within one business day.
                </p>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-obsidian w-full py-4 font-body font-semibold text-base tracking-wide transition-all duration-300 mb-4"
                >
                  {service.cta}
                </Link>
                <a
                  href="tel:7187623400"
                  className="flex items-center justify-center gap-3 border border-slate hover:border-gold text-ivory hover:text-gold w-full py-4 font-body font-medium text-sm tracking-wide transition-all duration-300"
                >
                  Call 718.762.3400
                </a>
              </div>

              {/* Service highlights */}
              <div className="bg-carbon border border-slate/60 p-6 space-y-4">
                <p className="section-label">Why Choose Bonardi</p>
                {[
                  { icon: "◆", text: "30+ years of licensed experience" },
                  { icon: "◆", text: "NYC, Nassau & Suffolk licensed" },
                  { icon: "◆", text: "Lead-Safe Certified Firm" },
                  { icon: "◆", text: "Full project management" },
                  { icon: "◆", text: "Transparent pricing, no surprises" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-gold text-xs">{icon}</span>
                    <span className="text-ash text-sm font-body">{text}</span>
                  </div>
                ))}
              </div>

              {/* Service area */}
              <div className="border border-slate/50 p-6">
                <p className="section-label mb-3">Service Area</p>
                <p className="text-ash text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 bg-charcoal border-t border-slate">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Related Services</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-charcoal hover:bg-carbon transition-colors duration-300 p-6"
                >
                  <h3 className="font-body font-semibold text-ivory text-sm mb-2 group-hover:text-gold transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-cement text-xs font-body leading-relaxed line-clamp-2">{rel.tagline}</p>
                  <div className="mt-4 text-gold text-xs font-body font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
