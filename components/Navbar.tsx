"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const services = [
  { name: "Asphalt Services", href: "/services/asphalt" },
  { name: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
  { name: "Concrete & Blacktop", href: "/services/concrete" },
  { name: "Construction Management", href: "/services/construction-management" },
  { name: "Demolition", href: "/services/demolition" },
  { name: "Dormer Additions", href: "/services/dormer-additions" },
  { name: "Drainage", href: "/services/drainage" },
  { name: "Excavation", href: "/services/excavation" },
  { name: "Fire Damage Restoration", href: "/services/fire-damage-restoration" },
  { name: "Flooring", href: "/services/flooring" },
  { name: "Foundation Repair", href: "/services/foundation-repair-restoration" },
  { name: "Framing", href: "/services/framing" },
  { name: "Generac Generators", href: "/services/generac-generators" },
  { name: "Hardscaping", href: "/services/hardscaping" },
  { name: "Home Additions", href: "/services/home-additions-extensions" },
  { name: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
  { name: "Masonry & Brick Pointing", href: "/services/masonry-brick-pointing" },
  { name: "New Construction", href: "/services/new-construction" },
  { name: "Office Buildouts", href: "/services/office-buildouts" },
  { name: "Roofing", href: "/services/roofing-services" },
  { name: "Sidewalks", href: "/services/sidewalks" },
  { name: "Waterproofing", href: "/services/waterproofing" },
  { name: "Water & Mold Restoration", href: "/services/water-and-mold-restoration" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block bg-charcoal border-b border-slate">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <p className="text-cement text-xs font-body tracking-wide">
            NYC Lic: #1274180 &nbsp;·&nbsp; Nassau: #H0446880000 &nbsp;·&nbsp; Suffolk: #57853-H
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:Info@bonardiconst.com"
              className="text-ash text-xs hover:text-gold transition-colors font-body"
            >
              Info@bonardiconst.com
            </a>
            <a
              href="tel:7187623400"
              className="text-gold text-xs font-body font-semibold tracking-wide hover:text-gold-light transition-colors"
            >
              718.762.3400
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/95 backdrop-blur-md border-b border-slate shadow-2xl"
            : "bg-obsidian border-b border-slate/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border-2 border-gold rotate-45 group-hover:rotate-[55deg] transition-transform duration-500" />
                <div className="absolute inset-[6px] bg-gold rotate-45 group-hover:rotate-[55deg] transition-transform duration-500" />
              </div>
              <div>
                <span className="font-display font-bold text-ivory text-lg leading-none block">
                  BONARDI
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-gold uppercase block mt-0.5">
                  Construction, Inc.
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-ash hover:text-ivory text-sm font-body font-medium tracking-wide transition-colors link-underline"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-ash hover:text-ivory text-sm font-body font-medium tracking-wide transition-colors link-underline"
              >
                About
              </Link>

              {/* Services dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-ash hover:text-ivory text-sm font-body font-medium tracking-wide transition-colors link-underline">
                  Services
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-carbon border border-slate rounded-sm shadow-2xl transition-all duration-300 ${
                    servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-2 border-b border-slate">
                    <span className="section-label px-3 py-1 block">Our Services</span>
                  </div>
                  <div className="grid grid-cols-2 gap-px p-4">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="px-3 py-2 text-ash hover:text-gold hover:bg-slate/40 text-sm font-body transition-all rounded-sm"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-slate p-3">
                    <Link
                      href="/services"
                      className="flex items-center gap-2 text-gold text-sm font-body font-semibold hover:text-gold-light transition-colors px-3"
                    >
                      View All Services
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/gallery"
                className="text-ash hover:text-ivory text-sm font-body font-medium tracking-wide transition-colors link-underline"
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className="text-ash hover:text-ivory text-sm font-body font-medium tracking-wide transition-colors link-underline"
              >
                Blog
              </Link>
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <a
                href="tel:7187623400"
                className="hidden md:flex items-center gap-2 bg-gold hover:bg-gold-light text-obsidian px-5 py-2.5 text-sm font-body font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get a Quote
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-ash hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span className={`h-px bg-current transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2.5 w-5" : "w-5"}`} />
                  <span className={`h-px bg-current transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-3"}`} />
                  <span className={`h-px bg-current transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2.5 w-5" : "w-5"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-carbon/98 backdrop-blur-lg transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "0" }}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Gallery", href: "/gallery" },
              { name: "Blog", href: "/blog" },
              { name: "Contact", href: "/contact-us" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-slate text-2xl font-display text-ivory hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="py-4 border-b border-slate">
              <p className="text-2xl font-display text-ivory mb-4">Services</p>
              <div className="grid grid-cols-1 gap-2">
                {services.slice(0, 8).map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-ash hover:text-gold text-sm font-body transition-colors py-1"
                  >
                    {service.name}
                  </Link>
                ))}
                <Link href="/services" onClick={() => setMobileOpen(false)} className="text-gold text-sm font-body font-semibold mt-2">
                  View All →
                </Link>
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-4">
            <a
              href="tel:7187623400"
              className="flex items-center justify-center gap-2 bg-gold text-obsidian py-4 font-body font-semibold text-lg"
            >
              718.762.3400
            </a>
            <p className="text-cement text-xs text-center font-mono">NYC Lic: #1274180</p>
          </div>
        </div>
      </div>
    </>
  );
}
