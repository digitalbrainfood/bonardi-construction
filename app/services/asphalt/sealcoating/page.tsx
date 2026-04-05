import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug, getRelatedServices } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Asphalt Sealcoating",
  description:
    "Professional asphalt sealcoating services from Bonardi Construction — protect and extend the life of your driveway or parking lot. Queens, Brooklyn, Nassau & Suffolk County.",
};

export default function AsphaltSealcoatingPage() {
  const service = getServiceBySlug("asphalt-sealcoating")!;
  const related = getRelatedServices(service.relatedSlugs);

  return (
    <>
      {/* Breadcrumb + header */}
      <section className="pt-10 pb-16 bg-carbon border-b border-slate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              HOME
            </Link>
            <span className="text-slate text-xs">/</span>
            <Link href="/services" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              SERVICES
            </Link>
            <span className="text-slate text-xs">/</span>
            <Link href="/services/asphalt" className="text-stone hover:text-ash text-xs font-mono tracking-wide transition-colors">
              ASPHALT
            </Link>
            <span className="text-slate text-xs">/</span>
            <span className="text-gold text-xs font-mono tracking-wide uppercase">SEALCOATING</span>
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
            <div className="lg:col-span-7 space-y-12">
              <div>
                <p className="font-body text-ash text-lg leading-relaxed">{service.intro}</p>
              </div>

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

              <div className="border-l-2 border-gold pl-6 bg-charcoal -ml-6 py-6 pr-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-gold" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-ash">
                    The Bonardi Advantage
                  </h2>
                </div>
                <p className="font-body text-ash text-base leading-relaxed">{service.whyUs}</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-charcoal border border-slate p-8">
                <p className="section-label mb-5">Request a Quote</p>
                <p className="font-body text-ash text-sm leading-relaxed mb-6">
                  Get a free, no-obligation estimate for your {service.name.toLowerCase()} project.
                  We respond within one business day.
                </p>
                <Link
                  href={`/contact-us?service=${encodeURIComponent(service.name)}`}
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
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
