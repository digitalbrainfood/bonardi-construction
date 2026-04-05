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
    <section className="py-24 bg-carbon border-t border-slate" id="about">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Why Bonardi</span>
            </div>
            <h2 className="font-display font-bold text-display-xl text-ivory">
              The Standard Others{" "}
              <em className="italic text-gold">Measure Against.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="font-body text-ash text-base leading-relaxed border-l border-gold pl-6">
              Choosing Bonardi Construction means choosing a team where every member
              understands that reputation is everything. Our work across Queens, Brooklyn,
              Nassau, and Suffolk County speaks louder than any marketing claim.
            </p>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group bg-carbon hover:bg-charcoal transition-colors duration-300 p-8"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs text-gold tracking-widest">{pillar.number}</span>
                <div className="w-4 h-px bg-slate group-hover:bg-gold transition-colors duration-500 mt-2" />
              </div>
              <h3 className="font-display font-semibold text-ivory text-xl mb-4">{pillar.title}</h3>
              <p className="font-body text-cement text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Residential + Commercial callouts */}
        <div className="grid md:grid-cols-2 gap-px bg-slate mt-px">
          <div className="bg-charcoal p-10">
            <span className="section-label block mb-4">Residential</span>
            <h3 className="font-display font-bold text-2xl text-ivory mb-4">
              Your Home, Reimagined.
            </h3>
            <p className="font-body text-cement text-sm leading-relaxed">
              From extensions to dormers, kitchen remodeling to bathroom renovations, roofing
              to water and mold restoration — we handle every aspect of your home with precision
              and genuine care for your family&apos;s investment.
            </p>
          </div>
          <div className="bg-charcoal p-10 border-l border-slate">
            <span className="section-label block mb-4">Commercial</span>
            <h3 className="font-display font-bold text-2xl text-ivory mb-4">
              Projects of Any Scale.
            </h3>
            <p className="font-body text-cement text-sm leading-relaxed">
              Concrete work, brick restoration, milling, paving, sealcoating, striping, and
              office buildouts — our licensed contractors execute commercial projects with
              the planning rigor and site discipline your business demands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
