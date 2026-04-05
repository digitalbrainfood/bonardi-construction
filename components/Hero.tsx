"use client";

import { useEffect } from "react";
import Link from "next/link";

const services = [
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
];

const trustBadges = [
  {
    label: "Licensed &\nBonded",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: "Lead-Safe\nCertified",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "30+ Years\nExperience",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
];

export default function Hero() {
  useEffect(() => {
    const elements = document.querySelectorAll(".will-animate");
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("will-animate");
        el.classList.add("animate-fade-up");
      }, i * 120);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-white">
      {/* Blueprint / architectural background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0055A5" strokeWidth="0.5" />
            </pattern>
            <pattern id="hero-grid-lg" width="240" height="240" patternUnits="userSpaceOnUse">
              <rect width="240" height="240" fill="url(#hero-grid)" />
              <path d="M 240 0 L 0 0 0 240" fill="none" stroke="#0055A5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-lg)" />
        </svg>

        {/* Diagonal construction lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="100%" x2="60%" y2="0" stroke="#0055A5" strokeWidth="1" />
          <line x1="30%" y1="100%" x2="90%" y2="0" stroke="#0055A5" strokeWidth="0.5" />
          <line x1="70%" y1="100%" x2="100%" y2="30%" stroke="#0055A5" strokeWidth="0.5" />
        </svg>

        {/* Gradient overlays for depth */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-radial from-brand/[0.02] to-transparent rounded-full blur-[80px]" />
      </div>

      {/* Vertical structural accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[8.333%] bottom-0 w-px bg-brand/[0.06]" />
        <div className="absolute top-0 left-[33.333%] bottom-0 w-px bg-brand/[0.04]" />
        <div className="absolute top-0 right-[25%] bottom-0 w-px bg-brand/[0.04]" />
        <div className="absolute top-0 right-[8.333%] bottom-0 w-px bg-brand/[0.06]" />
      </div>

      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center pt-16 pb-20 md:pt-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Left column — main content ── */}
          <div className="lg:col-span-7 lg:pr-12">
            {/* Label */}
            <div className="will-animate flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-brand" />
              <span className="section-label">General Contracting — Queens, NY</span>
            </div>

            {/* Main headline */}
            <h1 className="will-animate font-display font-bold text-display-2xl text-black leading-none mb-6">
              Built on{" "}
              <em className="italic text-accent not-italic" style={{ fontStyle: "italic" }}>
                Thirty
              </em>
              <br />
              Years of{" "}
              <span className="relative inline-block">
                Craft.
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10 Q75 2, 150 8 Q225 14, 298 4"
                    stroke="#0055A5"
                    strokeWidth="2.5"
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
            <p className="will-animate font-body text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Bonardi Construction delivers quality, value, and reliability across
              residential and commercial projects throughout New York City and Long Island.
            </p>

            {/* CTAs */}
            <div className="will-animate flex flex-wrap gap-4 mb-14">
              <Link
                href="/contact-us"
                className="group flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-7 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-accent/25"
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
                className="flex items-center gap-3 border-2 border-brand text-brand hover:bg-brand hover:text-white px-7 py-4 rounded-lg font-body font-medium text-base tracking-wide transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust badges */}
            <div className="will-animate flex gap-8 max-w-md">
              {trustBadges.map(({ label, icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-md bg-brand-50 border border-brand-100 flex items-center justify-center text-brand">
                    {icon}
                  </div>
                  <span className="text-gray-700 text-xs font-body leading-tight whitespace-pre-line pt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — info cards ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Core Services card */}
            <div className="will-animate bg-white border border-gray-200 rounded-xl shadow-card p-6">
              <p className="section-label mb-4">Core Services</p>
              <div className="flex flex-wrap gap-2">
                {services.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-body text-brand-700 border border-brand/20 bg-brand-50/60 hover:border-brand hover:bg-brand-50 px-3 py-1.5 rounded-md cursor-default transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick contact card */}
            <div className="will-animate bg-white border border-gray-200 rounded-xl shadow-card p-6 relative overflow-hidden">
              {/* Accent left border */}
              <div className="absolute top-0 left-0 w-1 h-full bg-brand rounded-l-xl" />

              <p className="section-label mb-3 pl-3">Reach Us Directly</p>
              <a
                href="tel:7187623400"
                className="font-display text-3xl text-brand hover:text-brand-dark transition-colors block mb-1 pl-3"
              >
                718.762.3400
              </a>
              <p className="text-gray-500 text-sm font-body mb-4 pl-3">
                Queens, Brooklyn &amp; Long Island
              </p>

              <div className="brand-rule-left mx-3 mb-4" />

              <div className="flex gap-5 pl-3">
                <a
                  href="https://www.facebook.com/Bonardiconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-500 hover:text-brand text-xs font-mono tracking-wider transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  FACEBOOK
                </a>
                <a
                  href="https://www.instagram.com/bonardiconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-500 hover:text-brand text-xs font-mono tracking-wider transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  INSTAGRAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-gray-500 text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
