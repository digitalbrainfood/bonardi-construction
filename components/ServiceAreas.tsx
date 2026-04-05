"use client";

import ScrollReveal from "@/components/ScrollReveal";

const areas = [
  { name: "Queens, NY", primary: true },
  { name: "Brooklyn, NY", primary: true },
  { name: "Nassau County", primary: true },
  { name: "Suffolk County", primary: true },
  { name: "Garden City", primary: false },
  { name: "Valley Stream", primary: false },
  { name: "Uniondale", primary: false },
  { name: "Farmingdale", primary: false },
  { name: "Huntington", primary: false },
  { name: "Bay Shore", primary: false },
  { name: "Patchogue", primary: false },
  { name: "Long Island", primary: false },
];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-white" id="service-areas">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="slide-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-brand" />
                <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand">
                  Where We Serve
                </span>
              </div>
              <h2 className="font-display font-bold text-display-lg text-gray-900 mb-6">
                NYC &amp; Long Island&apos;s
                <br />
                <em className="italic text-brand">Trusted Contractor.</em>
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
                Based in Queens, we serve the full NYC metro area and extend throughout
                Long Island. Wherever your project is, our team brings the same
                standard of excellence you deserve.
              </p>

              {/* License badges */}
              <div className="space-y-3">
                {[
                  { label: "NYC License", value: "#1274180" },
                  { label: "Nassau County", value: "#H0446880000" },
                  { label: "Suffolk County", value: "#57853-H" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-brand rotate-45 flex-shrink-0" />
                    <span className="text-gray-600 text-sm font-body">
                      {label}:{" "}
                      <span className="text-gray-900 font-mono font-medium">
                        {value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right -- area grid */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="slide-right" delay={150}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {areas.map((area) => (
                  <div
                    key={area.name}
                    className={`flex items-center gap-3 px-5 py-4 rounded-lg border ${
                      area.primary
                        ? "bg-white border-gray-200 shadow-card"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        area.primary ? "bg-brand" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`font-body text-sm ${
                        area.primary
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {area.name}
                    </span>
                  </div>
                ))}
                {/* And beyond */}
                <div className="flex items-center gap-3 px-5 py-4 rounded-lg border border-brand-light bg-brand-light/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand/40 flex-shrink-0" />
                  <span className="font-body text-sm text-brand/70 italic">
                    And beyond...
                  </span>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg aspect-[16/7] flex items-center justify-center relative overflow-hidden">
                <div className="text-center relative z-10">
                  <p className="text-gray-400 text-sm font-mono tracking-widest mb-2">
                    NEW YORK METRO AREA
                  </p>
                  <p className="text-gray-400 text-xs font-body">
                    Interactive map coming soon
                  </p>
                </div>
                {/* Decorative dots */}
                {[
                  { top: "35%", left: "40%" },
                  { top: "45%", left: "55%" },
                  { top: "55%", left: "65%" },
                  { top: "60%", left: "75%" },
                  { top: "50%", left: "80%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-brand/50 animate-pulse"
                    style={{ ...pos, animationDelay: `${i * 300}ms` }}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
