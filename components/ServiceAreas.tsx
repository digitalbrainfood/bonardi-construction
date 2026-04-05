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
    <section className="py-24 bg-obsidian border-t border-slate" id="service-areas">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Where We Serve</span>
            </div>
            <h2 className="font-display font-bold text-display-lg text-ivory mb-6">
              NYC & Long Island&apos;s
              <br />
              <em className="italic text-gold">Trusted Contractor.</em>
            </h2>
            <p className="font-body text-ash text-base leading-relaxed mb-8">
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
                  <div className="w-2 h-2 bg-gold rotate-45 flex-shrink-0" />
                  <span className="text-ash text-sm font-body">
                    {label}: <span className="text-ivory font-mono">{value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — area grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-slate">
              {areas.map((area) => (
                <div
                  key={area.name}
                  className={`
                    flex items-center gap-3 p-5
                    ${area.primary ? "bg-charcoal" : "bg-carbon"}
                  `}
                >
                  <div
                    className={`w-1.5 h-1.5 rotate-45 flex-shrink-0 ${
                      area.primary ? "bg-gold" : "bg-stone"
                    }`}
                  />
                  <span
                    className={`font-body text-sm ${
                      area.primary ? "text-ivory font-medium" : "text-ash"
                    }`}
                  >
                    {area.name}
                  </span>
                </div>
              ))}
              {/* And beyond */}
              <div className="bg-carbon flex items-center gap-3 p-5">
                <div className="w-1.5 h-1.5 rotate-45 bg-gold/40 flex-shrink-0" />
                <span className="font-body text-sm text-gold/70 italic">And beyond…</span>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-px bg-charcoal border border-slate/50 aspect-[16/7] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
              <div className="text-center relative z-10">
                <p className="text-cement text-sm font-mono tracking-widest mb-2">NEW YORK METRO AREA</p>
                <p className="text-stone text-xs font-body">Interactive map coming soon</p>
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
                  className="absolute w-2 h-2 rounded-full bg-gold/60 animate-pulse"
                  style={{ ...pos, animationDelay: `${i * 300}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
