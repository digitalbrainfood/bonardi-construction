"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Trigger animations after mount
    const elements = document.querySelectorAll(".will-animate");
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("will-animate");
        el.classList.add("animate-fade-up");
      }, i * 120);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-obsidian">
      {/* Structural grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[8.333%] bottom-0 w-px bg-slate/30" />
        <div className="absolute top-0 left-[33.333%] bottom-0 w-px bg-slate/20" />
        <div className="absolute top-0 right-[25%] bottom-0 w-px bg-slate/20" />
        <div className="absolute top-0 right-[8.333%] bottom-0 w-px bg-slate/30" />
      </div>

      {/* Background atmospheric gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-16 pb-20 md:pt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* Left column — main content */}
          <div className="lg:col-span-7 lg:pr-16">
            {/* Label */}
            <div className="will-animate flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">General Contracting — Queens, NY</span>
            </div>

            {/* Main headline */}
            <h1
              ref={headingRef}
              className="will-animate font-display font-bold text-display-2xl text-ivory leading-none mb-6"
            >
              Built on{" "}
              <em className="italic text-gold">
                Thirty
              </em>
              <br />
              Years of{" "}
              <span className="relative">
                Craft.
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10 Q75 2, 150 8 Q225 14, 298 4"
                    stroke="#C9A44A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{
                      animation: "drawLine 1.2s ease forwards 0.8s",
                    }}
                  />
                </svg>
                <style>{`
                  @keyframes drawLine {
                    to { stroke-dashoffset: 0; }
                  }
                `}</style>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="will-animate font-body text-ash text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Bonardi Construction delivers quality, value, and reliability across
              residential and commercial projects throughout New York City and Long Island.
            </p>

            {/* CTAs */}
            <div className="will-animate flex flex-wrap gap-4 mb-16">
              <Link
                href="/contact-us"
                className="group flex items-center gap-3 bg-gold hover:bg-gold-light text-obsidian px-7 py-4 font-body font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-gold/25"
              >
                Request a Free Quote
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 border border-stone hover:border-gold text-ivory hover:text-gold px-7 py-4 font-body font-medium text-base tracking-wide transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust badges */}
            <div className="will-animate grid grid-cols-3 gap-4 max-w-sm">
              {[
                { label: "Licensed &\nBonded", icon: "🏛" },
                { label: "Lead-Safe\nCertified", icon: "✓" },
                { label: "30+ Years\nExperience", icon: "◆" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex flex-col items-start gap-2">
                  <span className="text-gold text-sm font-mono">{icon}</span>
                  <span className="text-ash text-xs font-body leading-tight whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — service tags + visual element */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Stacked service pills */}
            <div className="will-animate border border-slate bg-carbon/60 backdrop-blur-sm p-6">
              <p className="section-label mb-4">Core Services</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Asphalt & Paving",
                  "Masonry",
                  "Roofing",
                  "New Construction",
                  "Demolition",
                  "Foundation Repair",
                  "Hardscaping",
                  "Excavation",
                  "Waterproofing",
                  "Fire Restoration",
                  "Home Additions",
                  "Office Buildouts",
                  "Concrete",
                  "Drainage",
                  "Flooring",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-body text-ash border border-slate/80 hover:border-gold hover:text-gold px-3 py-1.5 cursor-default transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick contact card */}
            <div className="will-animate border-l-2 border-gold bg-carbon/60 backdrop-blur-sm p-6">
              <p className="section-label mb-3">Reach Us Directly</p>
              <a
                href="tel:7187623400"
                className="font-display text-3xl text-ivory hover:text-gold transition-colors block mb-1"
              >
                718.762.3400
              </a>
              <p className="text-cement text-sm font-body mb-4">Queens, Brooklyn & Long Island</p>
              <div className="grid-rule gold-rule-left" />
              <div className="mt-4 flex gap-4">
                <a
                  href="https://www.facebook.com/Bonardiconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cement hover:text-gold text-xs font-mono tracking-wider transition-colors"
                >
                  FACEBOOK
                </a>
                <a
                  href="https://www.instagram.com/bonardiconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cement hover:text-gold text-xs font-mono tracking-wider transition-colors"
                >
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-ash text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-ash to-transparent animate-pulse" />
      </div>
    </section>
  );
}
