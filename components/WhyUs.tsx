"use client";

import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  {
    number: "01",
    title: "Unparalleled Expertise",
    body: "With 30+ years of hands-on experience, our owners and management team have navigated every challenge the industry presents. That depth of knowledge flows into every estimate, decision, and nail driven on your project.",
  },
  {
    number: "02",
    title: "Quality That Lasts",
    body: "We source premium materials and employ craftsmen who take pride in their work. Every surface, joint, and seam reflects a standard of quality built to outlast trends and time.",
  },
  {
    number: "03",
    title: "Client-First Approach",
    body: "Your project manager is your single point of contact from kickoff to completion. We believe your experience during construction matters as much as the finished result.",
  },
  {
    number: "04",
    title: "On-Time Delivery",
    body: "Schedules are commitments, not suggestions. Our project management discipline means deadlines are respected and you're never left guessing about progress.",
  },
  {
    number: "05",
    title: "Safety Without Compromise",
    body: "Strict OSHA-compliant safety protocols protect our team, your property, and the surrounding community on every job site, every day.",
  },
  {
    number: "06",
    title: "Transparent Value",
    body: "Honest, detailed quotes with no hidden costs. We work within your budget constraints while delivering results that punch well above their price point.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-brand" />
                <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand">
                  Why Bonardi
                </span>
              </div>
              <h2 className="font-display font-bold text-display-xl text-gray-900">
                The Standard Others{" "}
                <em className="italic text-brand">Measure Against.</em>
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="font-body text-gray-600 text-base leading-relaxed border-l-2 border-brand pl-6">
                Choosing Bonardi Construction means choosing a team where every member
                understands that reputation is everything. Our work across Queens, Brooklyn,
                Nassau, and Suffolk County speaks louder than any marketing claim.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.number} animation="scale-in" delay={i * 80}>
              <div
                className="group bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-mono text-xs font-semibold text-brand tracking-widest">
                    {pillar.number}
                  </span>
                  <div className="w-6 h-px bg-gray-300 group-hover:bg-brand group-hover:w-10 transition-all duration-500 mt-2" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 text-xl mb-4">
                  {pillar.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Residential + Commercial callouts */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 shadow-card">
              <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand block mb-4">
                Residential
              </span>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                Your Home, Reimagined.
              </h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                From extensions to dormers, kitchen remodeling to bathroom renovations, roofing
                to water and mold restoration — we handle every aspect of your home with precision
                and genuine care for your family&apos;s investment.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 shadow-card">
              <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand block mb-4">
                Commercial
              </span>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                Projects of Any Scale.
              </h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Concrete work, brick restoration, milling, paving, sealcoating, striping, and
                office buildouts — our licensed contractors execute commercial projects with
                the planning rigor and site discipline your business demands.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
