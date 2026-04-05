import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bonardi Construction, Inc. — 30+ years of general contracting excellence across Queens, Brooklyn, Nassau and Suffolk County.",
};

const values = [
  {
    title: "Quality",
    body: "Every material we specify and every technique we apply reflects our commitment to work that outlasts trends and withstands decades of use.",
  },
  {
    title: "Value",
    body: "Fair, transparent pricing that gives you maximum return on every dollar invested — without sacrificing an inch of craftsmanship.",
  },
  {
    title: "Reliability",
    body: "Schedules kept. Calls returned. Promises honored. Our clients return to us project after project because we simply do what we say.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-20 bg-carbon border-b border-slate relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Our Story</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <h1 className="font-display font-bold text-display-xl text-ivory">
                Three Decades of
                <br />
                <em className="italic text-gold">Building Trust.</em>
              </h1>
            </div>
            <div>
              <p className="font-body text-ash text-lg leading-relaxed border-l-2 border-gold pl-6">
                Bonardi Construction, Inc. was founded on a simple belief: that clients deserve a
                contractor who treats their project with the same care and urgency they would their own.
                That philosophy has guided every job we've taken since day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Our Core Values</span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-slate">
            {values.map((v, i) => (
              <div key={v.title} className="bg-obsidian p-10">
                <span className="font-mono text-xs text-gold tracking-widest mb-4 block">
                  0{i + 1}
                </span>
                <h2 className="font-display font-bold text-display-md text-ivory mb-4">{v.title}</h2>
                <p className="font-body text-ash text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gary Bonelli bio */}
      <section className="py-20 bg-charcoal border-t border-b border-slate" id="gary-m-bonelli">
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
                {/* Decorative corner */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40" />
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="section-label">Leadership</span>
              </div>
              <h2 className="font-display font-bold text-display-lg text-ivory mb-2">
                Gary M. Bonelli
              </h2>
              <p className="font-mono text-gold text-xs tracking-widest mb-8">
                OWNER &amp; PRINCIPAL CONTRACTOR
              </p>

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

      {/* Certifications & Partners */}
      <section className="py-20 bg-obsidian border-t border-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Certifications &amp; Partners</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate">
            {[
              { name: "Lead-Safe\nCertified Firm", sub: "EPA Certified" },
              { name: "Generac", sub: "Authorized Dealer & Installer" },
              { name: "Cambridge", sub: "Certified Partner" },
              { name: "Nicolock", sub: "Certified Partner" },
              { name: "Unilock", sub: "Certified Partner" },
            ].map(({ name, sub }) => (
              <div key={name} className="bg-obsidian flex flex-col items-center justify-center py-10 px-6 text-center">
                <span className="font-display font-semibold text-ivory text-base mb-2 whitespace-pre-line">{name}</span>
                <span className="text-stone text-xs font-body">{sub}</span>
              </div>
            ))}
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
            href="/contact"
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
