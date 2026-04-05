import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/areas-data";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Bonardi Construction serves Queens, Brooklyn, Nassau County, Suffolk County, and Long Island with expert general contracting services.",
  alternates: { canonical: "/areas-we-serve" },
};

export default function AreasWeServePage() {
  const queens = areas.filter((a) => a.county === "Queens");
  const nassau = areas.filter((a) => a.county === "Nassau County");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Areas We Serve", url: "/areas-we-serve" },
        ])}
      />
      {/* Header */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Service Area</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-black">
              Where We
              <br />
              <em className="italic text-brand">Build.</em>
            </h1>
            <p className="font-body text-gray-600 text-base leading-relaxed">
              Based in Queens, Bonardi Construction serves the full NYC metro area and extends
              throughout Long Island. Our licensed team brings the same standard of excellence
              to every neighborhood we work in.
            </p>
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Queens */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-10 bg-brand rounded-sm" />
              <div>
                <p className="section-label">Queens, NY</p>
                <p className="text-gray-500 text-xs font-body mt-0.5">{queens.length} neighborhoods</p>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {queens.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-2 h-2 bg-brand rotate-45 mt-1.5" />
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-brand opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="font-body font-semibold text-black text-base mb-2 group-hover:text-brand transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed line-clamp-2">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Nassau County */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-10 bg-brand-dark rounded-sm" />
              <div>
                <p className="section-label">Nassau County</p>
                <p className="text-gray-500 text-xs font-body mt-0.5">{nassau.length} areas</p>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nassau.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-2 h-2 bg-brand-dark rotate-45 mt-1.5" />
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-brand opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="font-body font-semibold text-black text-base mb-2 group-hover:text-brand transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed line-clamp-2">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional areas */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="font-body text-gray-600 text-base mb-2">
              We also serve <span className="text-black font-medium">Brooklyn, Suffolk County</span>, and
              communities throughout <span className="text-black font-medium">Long Island</span>.
            </p>
            <p className="font-body text-gray-500 text-sm">
              Don&apos;t see your area?{" "}
              <Link href="/contact-us" className="text-brand hover:text-brand-dark transition-colors">
                Contact us
              </Link>{" "}
              — chances are we can help.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Ready to start your project?
            </h2>
            <p className="font-body text-white/80">
              Call us at{" "}
              <a href="tel:7187623400" className="text-accent hover:text-accent-light transition-colors">
                718.762.3400
              </a>{" "}
              or request a free quote online.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-8 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
