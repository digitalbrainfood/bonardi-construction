"use client";

import { useState } from "react";

const categories = [
  "All",
  "Asphalt & Paving",
  "Concrete & Masonry",
  "Roofing",
  "New Construction",
  "Hardscaping",
  "Restoration",
];

// Deterministic category assignment to avoid hydration mismatch
const categoryOrder = [
  "Asphalt & Paving", "Concrete & Masonry", "Roofing", "New Construction",
  "Hardscaping", "Restoration", "Asphalt & Paving", "Concrete & Masonry",
  "Roofing", "New Construction", "Hardscaping", "Restoration",
  "Asphalt & Paving", "Concrete & Masonry", "Roofing", "New Construction",
  "Hardscaping", "Restoration", "Asphalt & Paving", "Concrete & Masonry",
  "Roofing", "New Construction", "Hardscaping", "Restoration",
];

// Placeholder items — replace with real images
const projects = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  category: categoryOrder[i],
  title: [
    "Residential Driveway — Queens",
    "Commercial Parking Lot — Nassau",
    "Brick Restoration — Brooklyn",
    "Custom Patio — Garden City",
    "New Roof — Huntington",
    "Foundation Repair — Flushing",
    "Office Buildout — Midtown",
    "Sidewalk Violation Repair — Jamaica",
  ][i % 8],
  // aspect ratios to create masonry-like effect
  tall: [2, 5, 9, 14, 17, 21].includes(i),
}));

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-carbon border-b border-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Portfolio</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-ivory">
            Our Work,
            <br />
            <em className="italic text-gold">Speaks for Itself.</em>
          </h1>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-obsidian border-b border-slate sticky top-[56px] md:top-[80px] z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                  active === cat
                    ? "bg-gold text-obsidian"
                    : "border border-slate text-cement hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-px space-y-px">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group relative break-inside-avoid bg-charcoal overflow-hidden cursor-pointer"
                onClick={() => setLightbox(project.id)}
              >
                {/* Placeholder image block */}
                <div
                  className={`w-full bg-gradient-to-br from-charcoal to-carbon relative ${
                    project.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  {/* Simulated photo texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone/20 via-transparent to-gold/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border border-stone/40 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-stone text-xs font-mono tracking-widest">PHOTO</p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-obsidian/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start justify-end p-5">
                    <span className="text-[10px] font-mono text-gold tracking-widest mb-2">{project.category}</span>
                    <h3 className="font-body font-semibold text-ivory text-sm leading-tight">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cement font-body">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-slate hover:border-gold text-ash hover:text-gold flex items-center justify-center transition-all"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-4xl w-full bg-charcoal border border-slate"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-carbon flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border border-stone/40 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-stone text-xs font-mono tracking-widest">PROJECT IMAGE {lightbox}</p>
              </div>
            </div>
            <div className="p-6 border-t border-slate">
              {(() => {
                const p = projects.find((x) => x.id === lightbox);
                return p ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gold tracking-widest block mb-1">{p.category}</span>
                      <h3 className="font-body font-semibold text-ivory">{p.title}</h3>
                    </div>
                    <a
                      href="/contact-us"
                      className="text-xs font-body font-semibold text-gold border border-gold/40 hover:border-gold px-4 py-2 transition-colors"
                    >
                      Similar Project?
                    </a>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-charcoal border-t border-slate">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="section-label mb-4">Want results like these?</p>
          <h2 className="font-display font-bold text-2xl text-ivory mb-6">
            Let&apos;s build something you&apos;ll be proud to show off.
          </h2>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-obsidian px-8 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
