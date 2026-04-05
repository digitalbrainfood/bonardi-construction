"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { galleryImages } from "@/lib/images";

const categories = [
  "All",
  "Asphalt & Paving",
  "Concrete & Masonry",
  "Roofing",
  "New Construction",
  "Hardscaping",
  "Restoration",
];

const projects = Object.entries(galleryImages).flatMap(([category, images]) =>
  images.map((src, i) => ({
    id: category + i,
    category,
    src,
    title: [
      "Residential Driveway — Queens",
      "Commercial Parking Lot — Nassau",
      "Brick Restoration — Brooklyn",
      "Custom Patio — Garden City",
    ][i % 4],
    tall: i % 3 === 1,
  }))
);

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Portfolio</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-black">
            Our Work,
            <br />
            <em className="italic text-brand">Speaks for Itself.</em>
          </h1>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-4 bg-white border-b border-gray-200 sticky top-[56px] md:top-[80px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-mono tracking-widest uppercase rounded-lg transition-all duration-200 ${
                  active === cat
                    ? "bg-brand text-white"
                    : "border border-gray-100 text-gray-500 hover:border-brand hover:text-brand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group relative break-inside-avoid rounded-lg overflow-hidden shadow-card cursor-pointer"
                onClick={() => setLightbox(project.id)}
              >
                <div
                  className={`w-full relative ${
                    project.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-start justify-end p-5">
                    <span className="text-[10px] font-mono text-white/80 tracking-widest mb-2">{project.category}</span>
                    <h3 className="font-body font-semibold text-white text-sm leading-tight">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-body">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-gray-300 hover:border-brand text-gray-500 hover:text-brand rounded-lg flex items-center justify-center bg-white transition-all"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative">
              <Image
                src={projects.find(x => x.id === lightbox)?.src || ""}
                alt="Project"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            <div className="p-6 border-t border-gray-200">
              {(() => {
                const p = projects.find((x) => x.id === lightbox);
                return p ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-brand tracking-widest block mb-1">{p.category}</span>
                      <h3 className="font-body font-semibold text-black">{p.title}</h3>
                    </div>
                    <Link
                      href="/contact-us"
                      className="text-xs font-body font-semibold text-brand border border-brand/40 hover:border-brand px-4 py-2 rounded-lg transition-colors"
                    >
                      Similar Project?
                    </Link>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/80 text-xs font-mono tracking-widest uppercase mb-4">Want results like these?</p>
          <h2 className="font-display font-bold text-2xl text-white mb-6">
            Let&apos;s build something you&apos;ll be proud to show off.
          </h2>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-8 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
