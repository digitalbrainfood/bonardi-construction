import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gary M. Bonelli — Owner & Principal Contractor",
  description:
    "Meet Gary M. Bonelli, owner and principal contractor of Bonardi Construction, Inc. — 30+ years of hands-on general contracting expertise across NYC and Long Island.",
};

export default function GaryBonelliPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 bg-carbon border-b border-slate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Leadership</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-ivory">
            Gary M. Bonelli
          </h1>
          <p className="font-mono text-gold text-xs tracking-widest mt-3">
            OWNER &amp; PRINCIPAL CONTRACTOR
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Photo placeholder */}
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] bg-carbon border border-slate flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                <div className="text-center relative z-10">
                  <div className="w-20 h-20 border-2 border-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-3xl text-gold/60">GB</span>
                  </div>
                  <p className="text-stone text-xs font-mono tracking-widest">PHOTO COMING SOON</p>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-8">
              <div className="space-y-5 font-body text-ash text-base leading-relaxed">
                <p>
                  Gary M. Bonelli founded Bonardi Construction with a commitment to delivering
                  exceptional craftsmanship and genuine reliability to every client. With over
                  30 years of hands-on experience across residential, commercial, and municipal
                  projects throughout the New York City metro area, Gary brings a depth of
                  expertise that few contractors can match.
                </p>
                <p>
                  His career spans everything from ground-up residential construction to complex
                  commercial demolition and restoration projects. Gary personally oversees
                  project management processes, ensuring that every engagement meets the
                  exacting standards Bonardi Construction has become known for across Queens,
                  Brooklyn, Nassau County, and Suffolk County.
                </p>
                <p>
                  Gary holds active general contractor licenses in New York City, Nassau County,
                  and Suffolk County, and maintains Bonardi Construction&apos;s status as a
                  Lead-Safe Certified Firm and authorized Generac dealer and installer.
                </p>
              </div>

              {/* Credential grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { label: "NYC License", value: "#1274180" },
                  { label: "Nassau County", value: "#H0446880000" },
                  { label: "Suffolk County", value: "#57853-H" },
                  { label: "Experience", value: "30+ Years" },
                  { label: "Certification", value: "Lead-Safe Firm" },
                  { label: "Authorized Dealer", value: "Generac" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-carbon border border-slate/60 p-4">
                    <p className="text-stone text-xs font-mono mb-1">{label}</p>
                    <p className="text-ivory text-sm font-body font-medium">{value}</p>
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
