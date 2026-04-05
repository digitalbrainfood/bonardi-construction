import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutImages } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bonardi Construction, Inc. — 30+ years of general contracting excellence across Queens, Brooklyn, Nassau and Suffolk County.",
  alternates: { canonical: "/about" },
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
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ])}
      />
      {/* Hero */}
      <section className="pt-16 pb-20 bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-brand/[0.04] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Our Story</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <h1 className="font-display font-bold text-display-xl text-black">
                Three Decades of
                <br />
                <em className="italic text-brand">Building Trust.</em>
              </h1>
            </div>
            <div>
              <p className="font-body text-gray-600 text-lg leading-relaxed border-l-2 border-brand pl-6">
                Bonardi Construction, Inc. was founded on a simple belief: that clients deserve a
                contractor who treats their project with the same care and urgency they would their own.
                That philosophy has guided every job we&apos;ve taken since day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Our Core Values</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-lg p-10">
                <span className="font-mono text-xs text-brand tracking-widest mb-4 block">
                  0{i + 1}
                </span>
                <h2 className="font-display font-bold text-display-md text-black mb-4">{v.title}</h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gary Bonelli bio */}
      <section className="py-20 bg-white border-t border-b border-gray-200" id="gary-m-bonelli">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                <Image
                  src={aboutImages.gary}
                  alt="Gary M. Bonelli — Owner & Principal Contractor"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-brand" />
                <span className="section-label">Leadership</span>
              </div>
              <h2 className="font-display font-bold text-display-lg text-black mb-2">
                Gary M. Bonelli
              </h2>
              <p className="font-mono text-brand text-xs tracking-widest mb-8">
                OWNER &amp; PRINCIPAL CONTRACTOR
              </p>

              <div className="space-y-5 font-body text-gray-600 text-base leading-relaxed">
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
                  <div key={label} className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-400 text-xs font-mono mb-1">{label}</p>
                    <p className="text-black text-sm font-body font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Certifications &amp; Partners</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Lead-Safe\nCertified Firm", sub: "EPA Certified" },
              { name: "Generac", sub: "Authorized Dealer & Installer" },
              { name: "Cambridge", sub: "Certified Partner" },
              { name: "Nicolock", sub: "Certified Partner" },
              { name: "Unilock", sub: "Certified Partner" },
            ].map(({ name, sub }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center py-10 px-6 text-center">
                <span className="font-display font-semibold text-black text-base mb-2 whitespace-pre-line">{name}</span>
                <span className="text-gray-500 text-xs font-body">{sub}</span>
              </div>
            ))}
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
              <a href="tel:7187623400" className="text-white underline hover:text-accent transition-colors">
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
