"use client";

import { useState } from "react";
import Link from "next/link";
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

const mapRegions = [
  {
    id: "brooklyn",
    name: "Brooklyn",
    href: "/areas-we-serve",
    // Simplified polygon for Brooklyn (southwest area)
    points: "80,130 120,110 145,125 150,155 130,170 95,165 75,150",
  },
  {
    id: "queens",
    name: "Queens",
    href: "/areas-we-serve",
    // Simplified polygon for Queens (northwest area, above Brooklyn)
    points: "120,60 165,45 185,65 180,100 145,125 120,110 105,85",
  },
  {
    id: "nassau",
    name: "Nassau County",
    href: "/areas-we-serve",
    // Nassau County (middle of Long Island)
    points: "185,65 240,40 270,55 275,100 260,130 220,145 180,140 145,125 180,100",
  },
  {
    id: "suffolk",
    name: "Suffolk County",
    href: "/areas-we-serve",
    // Suffolk County (eastern Long Island)
    points: "270,55 350,20 420,15 430,35 400,55 370,70 340,90 310,105 275,100",
  },
];

export default function ServiceAreas() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGPolygonElement>, regionName: string) => {
    const svg = e.currentTarget.closest("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="service-areas">
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
              <h2 className="font-display font-bold text-display-lg text-gray-900 dark:text-gray-100 mb-6">
                NYC &amp; Long Island&apos;s
                <br />
                <em className="italic text-brand">Trusted Contractor.</em>
              </h2>
              <p className="font-body text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">
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
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-body">
                      {label}:{" "}
                      <span className="text-gray-900 dark:text-gray-100 font-mono font-medium">
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
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-card dark:shadow-none"
                        : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800"
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
                          ? "text-gray-900 dark:text-gray-100 font-medium"
                          : "text-gray-600 dark:text-gray-400"
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

              {/* Interactive SVG Map */}
              <div className="mt-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg aspect-[16/7] relative overflow-hidden">
                <svg
                  viewBox="0 0 460 180"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Map of NYC and Long Island service areas"
                >
                  {/* Water background */}
                  <rect width="460" height="180" fill="#f0f7ff" rx="0" />

                  {/* Water texture lines */}
                  <g opacity="0.15" stroke="#93c5fd" strokeWidth="0.5" fill="none">
                    <path d="M0,160 Q60,155 120,160 Q180,165 240,158 Q300,150 360,155 Q420,160 460,155" />
                    <path d="M0,170 Q80,165 160,172 Q240,178 320,168 Q400,158 460,165" />
                    <path d="M0,35 Q50,30 100,38 Q160,45 210,35 Q260,25 310,32" />
                  </g>

                  {/* Manhattan reference (non-clickable, just for context) */}
                  <polygon
                    points="65,60 75,35 85,30 90,55 88,95 80,110 68,100"
                    fill="#d1d5db"
                    stroke="#9ca3af"
                    strokeWidth="0.75"
                    opacity="0.5"
                  />
                  <text x="72" y="72" fontSize="7" fill="#9ca3af" textAnchor="middle" fontFamily="sans-serif">
                    Manhattan
                  </text>

                  {/* Clickable regions */}
                  {mapRegions.map((region) => (
                    <Link key={region.id} href={region.href}>
                      <polygon
                        points={region.points}
                        fill={hoveredRegion === region.id ? "rgba(0,85,165,0.2)" : "#e5e7eb"}
                        stroke={hoveredRegion === region.id ? "#0055A5" : "#9ca3af"}
                        strokeWidth={hoveredRegion === region.id ? "1.5" : "0.75"}
                        className="cursor-pointer"
                        style={{ transition: "fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease" }}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onMouseMove={(e) => handleMouseMove(e, region.name)}
                      />
                    </Link>
                  ))}

                  {/* Region labels */}
                  <text x="110" y="148" fontSize="7" fill="#374151" textAnchor="middle" fontFamily="sans-serif" fontWeight="500" pointerEvents="none">
                    Brooklyn
                  </text>
                  <text x="148" y="82" fontSize="7" fill="#374151" textAnchor="middle" fontFamily="sans-serif" fontWeight="500" pointerEvents="none">
                    Queens
                  </text>
                  <text x="220" y="95" fontSize="7" fill="#374151" textAnchor="middle" fontFamily="sans-serif" fontWeight="500" pointerEvents="none">
                    Nassau
                  </text>
                  <text x="350" y="55" fontSize="7" fill="#374151" textAnchor="middle" fontFamily="sans-serif" fontWeight="500" pointerEvents="none">
                    Suffolk County
                  </text>

                  {/* Map title */}
                  <text x="230" y="175" fontSize="7" fill="#9ca3af" textAnchor="middle" fontFamily="monospace" letterSpacing="0.15em">
                    NEW YORK METRO AREA
                  </text>
                </svg>

                {/* Tooltip */}
                {hoveredRegion && (
                  <div
                    className="absolute pointer-events-none bg-white dark:bg-gray-800 shadow-lg rounded-md px-3 py-1.5 text-xs font-body font-medium text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 z-10 whitespace-nowrap"
                    style={{
                      left: tooltipPos.x,
                      top: tooltipPos.y,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    {mapRegions.find((r) => r.id === hoveredRegion)?.name}
                    <span className="text-brand ml-1.5 text-[10px]">View area &rarr;</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
