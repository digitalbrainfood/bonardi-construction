import type { Metadata } from "next";
import Link from "next/link";
import { areas } from "@/lib/areas-data";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Bonardi Construction serves Queens, Brooklyn, Nassau County, Suffolk County, and Long Island with expert general contracting services.",
};

export default function AreasWeServePage() {
  const queens = areas.filter((a) => a.county === "Queens");
  const nassau = areas.filter((a) => a.county === "Nassau County");

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-carbon border-b border-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Service Area</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <h1 className="font-display font-bold text-display-xl text-ivory">
              Where We
              <br />
              <em className="italic text-gold">Build.</em>
            </h1>
            <p className="font-body text-ash text-base leading-relaxed">
              Based in Queens, Bonardi Construction serves the full NYC metro area and extends
              throughout Long Island. Our licensed team brings the same standard of excellence
              to every neighborhood we work in.
            </p>
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Queens */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-10 bg-gold" />
              <div>
                <p className="section-label">Queens, NY</p>
                <p className="text-stone text-xs font-body mt-0.5">{queens.length} neighborhoods</p>
              </div>
              <div className="flex-1 h-px bg-slate" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate">
              {queens.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="group bg-obsidian hover:bg-carbon transition-colors duration-300 p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-2 h-2 bg-gold rotate-45 mt-1.5" />
                    <svg
                      className="w-4 h-4 text-stone group-hover:text-gold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="font-body font-semibold text-ivory text-base mb-2 group-hover:text-gold transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="font-body text-cement text-sm leading-relaxed line-clamp-2">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Nassau County */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-10 bg-gold-dark" />
              <div>
                <p className="section-label">Nassau County</p>
                <p className="text-stone text-xs font-body mt-0.5">{nassau.length} areas</p>
              </div>
              <div className="flex-1 h-px bg-slate" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate">
              {nassau.map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas-we-serve/${area.slug}`}
                  className="group bg-obsidian hover:bg-carbon transition-colors duration-300 p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-2 h-2 bg-gold-dark rotate-45 mt-1.5" />
                    <svg
                      className="w-4 h-4 text-stone group-hover:text-gold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="font-body font-semibold text-ivory text-base mb-2 group-hover:text-gold transition-colors duration-300">
                    {area.name}
                  </h3>
                  <p className="font-body text-cement text-sm leading-relaxed line-clamp-2">{area.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Additional areas */}
          <div className="bg-charcoal border border-slate p-8 text-center">
            <p className="font-body text-ash text-base mb-2">
              We also serve <span className="text-ivory font-medium">Brooklyn, Suffolk County</span>, and
              communities throughout <span className="text-ivory font-medium">Long Island</span>.
            </p>
            <p className="font-body text-cement text-sm">
              Don&apos;t see your area?{" "}
              <Link href="/contact-us" className="text-gold hover:text-gold-light transition-colors">
                Contact us
              </Link>{" "}
              — chances are we can help.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal border-t border-slate">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-ivory mb-2">
              Ready to start your project?
            </h2>
            <p className="font-body text-ash">
              Call us at{" "}
              <a href="tel:7187623400" className="text-gold hover:text-gold-light transition-colors">
                718.762.3400
              </a>{" "}
              or request a free quote online.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 flex items-center gap-3 bg-gold hover:bg-gold-light text-obsidian px-8 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300"
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
