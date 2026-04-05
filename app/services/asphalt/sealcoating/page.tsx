import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getRelatedServices } from "@/lib/services-data";
import { serviceImages } from "@/lib/images";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Asphalt Sealcoating",
  description:
    "Professional asphalt sealcoating services from Bonardi Construction — protect and extend the life of your driveway or parking lot. Queens, Brooklyn, Nassau & Suffolk County.",
  alternates: { canonical: "/services/asphalt/sealcoating" },
};

export default function AsphaltSealcoatingPage() {
  const service = getServiceBySlug("asphalt-sealcoating")!;
  const related = getRelatedServices(service.relatedSlugs);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.tagline,
          slug: "asphalt-sealcoating",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Asphalt", url: "/services/asphalt" },
          { name: "Sealcoating", url: "/services/asphalt/sealcoating" },
        ])}
      />
      {/* Breadcrumb + header */}
      <section className="pt-10 pb-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-brand/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-mono tracking-wide transition-colors">
              HOME
            </Link>
            <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
            <Link href="/services" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-mono tracking-wide transition-colors">
              SERVICES
            </Link>
            <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
            <Link href="/services/asphalt" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-mono tracking-wide transition-colors">
              ASPHALT
            </Link>
            <span className="text-gray-300 dark:text-gray-600 text-xs">/</span>
            <span className="text-brand text-xs font-mono tracking-wide uppercase">SEALCOATING</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand" />
                <div className="flex gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="font-display font-bold text-display-lg text-black dark:text-white mb-3">
                {service.name}
              </h1>
              <p className="font-body text-brand text-base font-medium">{service.tagline}</p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <a
                href="tel:7187623400"
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-7 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
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
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-12">
              <div>
                <p className="font-body text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{service.intro}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-6 h-px bg-brand" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                    What&apos;s Included
                  </h2>
                </div>
                <ul className="space-y-4">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-brand rotate-45 mt-2 flex-shrink-0" />
                      <span className="font-body text-gray-800 dark:text-gray-200 text-base">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-2 border-brand pl-6 bg-brand-50 dark:bg-brand-900/30 -ml-6 py-6 pr-6 rounded-r-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-brand" />
                  <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                    The Bonardi Advantage
                  </h2>
                </div>
                <p className="font-body text-gray-600 dark:text-gray-400 text-base leading-relaxed">{service.whyUs}</p>
              </div>

              {/* Project image */}
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src={serviceImages["asphalt-sealcoating"]}
                  alt={`${service.name} project by Bonardi Construction`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              {/* Quote card */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <p className="section-label mb-5">Request a Quote</p>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  Get a free, no-obligation estimate for your {service.name.toLowerCase()} project.
                  We respond within one business day.
                </p>
                <QuoteForm variant="compact" preselectedService={service.name} />
              </div>

              {/* Why Choose Bonardi */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
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
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-body">{text}</span>
                  </div>
                ))}
              </div>

              {/* Service area */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="section-label mb-3">Service Area</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand" />
              <span className="section-label">Related Services</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-card-hover transition-all duration-300 p-6"
                >
                  <h3 className="font-body font-semibold text-black dark:text-white text-sm mb-2 group-hover:text-brand transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-body leading-relaxed line-clamp-2">{rel.tagline}</p>
                  <div className="mt-4 text-brand text-xs font-body font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
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
