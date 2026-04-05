"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

/* ─── Service data for mega menu ─── */
const serviceColumns = [
  {
    heading: "Residential",
    items: [
      { name: "Home Additions & Extensions", href: "/services/home-additions-extensions" },
      { name: "Dormer Additions", href: "/services/dormer-additions" },
      { name: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
      { name: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
      { name: "Roofing Services", href: "/services/roofing-services" },
      { name: "Foundation Repair", href: "/services/foundation-repair-restoration" },
      { name: "Framing", href: "/services/framing" },
      { name: "Flooring", href: "/services/flooring" },
      { name: "Sheetrock & Painting", href: "/services/sheetrock-painting" },
      { name: "Generac Generators", href: "/services/generac-generators" },
      { name: "New Construction", href: "/services/new-construction" },
    ],
  },
  {
    heading: "Exterior & Site Work",
    items: [
      { name: "Asphalt Services", href: "/services/asphalt" },
      { name: "Asphalt Sealcoating", href: "/services/asphalt/sealcoating" },
      { name: "Asphalt Milling", href: "/services/asphalt-milling" },
      { name: "Concrete & Blacktop", href: "/services/concrete" },
      { name: "Masonry & Brick Pointing", href: "/services/masonry-brick-pointing" },
      { name: "Masonry Restoration", href: "/services/masonry-restoration" },
      { name: "Hardscaping", href: "/services/hardscaping" },
      { name: "Sidewalks", href: "/services/sidewalks" },
      { name: "Drainage", href: "/services/drainage" },
      { name: "Excavation", href: "/services/excavation" },
      { name: "Concrete Leveling", href: "/services/concrete-leveling" },
      { name: "Parapet Wall Repair", href: "/services/parapet-wall-repair-rebuild" },
    ],
  },
  {
    heading: "Commercial & Specialty",
    items: [
      { name: "Construction Management", href: "/services/construction-management" },
      { name: "Office Buildouts", href: "/services/office-buildouts" },
      { name: "Commercial Milling & Paving", href: "/services/commercial-milling-paving" },
      { name: "Commercial Underpinning", href: "/services/commercial-underpinning" },
      { name: "Parking Lot Maintenance", href: "/services/commercial-parking-lot-maintenance" },
      { name: "Demolition", href: "/services/demolition" },
      { name: "Fire Damage Restoration", href: "/services/fire-damage-restoration" },
      { name: "Water & Mold Restoration", href: "/services/water-and-mold-restoration" },
      { name: "Waterproofing", href: "/services/waterproofing" },
      { name: "Soil Stabilization", href: "/services/soil-stabilization" },
      { name: "Construction Consultation", href: "/services/construction-consultation" },
    ],
  },
];

const allServices = serviceColumns.flatMap((col) => col.items);

const desktopLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact-us" },
];

const mobileLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Areas We Serve", href: "/areas-we-serve" },
  { name: "Contact", href: "/contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── Scroll listener ─── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Lock body scroll when mobile menu is open ─── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ─── Active-link helper ─── */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `relative text-sm font-body font-medium tracking-wide transition-colors duration-200 pb-1 ${
      isActive(href)
        ? "text-brand border-b-2 border-brand"
        : "text-gray-700 hover:text-brand"
    }`;

  /* ─── Mega menu hover handlers (with grace period) ─── */
  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          TOP UTILITY BAR
          ════════════════════════════════════════════════════════ */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <p className="text-gray-500 text-xs font-body tracking-wide">
            NYC Lic: #1274180 &nbsp;&middot;&nbsp; Nassau: #H0446880000
            &nbsp;&middot;&nbsp; Suffolk: #57853-H
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:Info@bonardiconst.com"
              className="text-gray-500 text-xs font-body hover:text-brand transition-colors duration-200"
            >
              Info@bonardiconst.com
            </a>
            <a
              href="tel:7187623400"
              className="text-brand text-xs font-body font-semibold tracking-wide hover:text-brand-dark transition-colors duration-200"
            >
              718.762.3400
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MAIN NAVBAR
          ════════════════════════════════════════════════════════ */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
          scrolled
            ? "shadow-md backdrop-blur-md border-b border-gray-100"
            : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/bonardi-logo.webp"
                alt="Bonardi Construction"
                width={200}
                height={50}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-8">
              {desktopLinks.map((link) =>
                link.name === "Services" ? (
                  <div
                    key="services"
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <button
                      className={`flex items-center gap-1 text-sm font-body font-medium tracking-wide transition-colors duration-200 pb-1 ${
                        isActive("/services")
                          ? "text-brand border-b-2 border-brand"
                          : "text-gray-700 hover:text-brand"
                      }`}
                      onClick={() => setMegaOpen((prev) => !prev)}
                      aria-expanded={megaOpen}
                    >
                      Services
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link key={link.name} href={link.href} className={linkClass(link.href)}>
                    {link.name}
                  </Link>
                )
              )}
            </div>

            {/* ── CTA + hamburger ── */}
            <div className="flex items-center gap-4">
              <Link
                href="/contact-us"
                className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-black px-5 py-2.5 rounded-md text-sm font-body font-semibold tracking-wide transition-all duration-300 hover:shadow-lg"
              >
                Get a Quote
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-brand transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span
                    className={`h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      mobileOpen ? "rotate-45 translate-y-[4px]" : "w-6"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileOpen ? "opacity-0 scale-0" : "w-4"
                    }`}
                  />
                  <span
                    className={`h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                      mobileOpen ? "-rotate-45 -translate-y-[4px]" : "w-6"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            MEGA MENU (desktop)
            ════════════════════════════════════════════════════════ */}
        <div
          className={`absolute left-0 right-0 top-full z-40 transition-all duration-300 ease-out ${
            megaOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-3 pointer-events-none"
          }`}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          {/* Shadow overlay */}
          <div className="bg-white border-b border-gray-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Three-column layout */}
              <div className="grid grid-cols-3 gap-8">
                {serviceColumns.map((col) => (
                  <div key={col.heading}>
                    {/* Column heading */}
                    <div className="mb-4">
                      <h3 className="text-sm font-body font-bold text-gray-900 uppercase tracking-wider">
                        {col.heading}
                      </h3>
                      <div className="mt-2 w-10 h-0.5 bg-accent rounded-full" />
                    </div>
                    {/* Service links */}
                    <ul className="space-y-1">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMegaOpen(false)}
                            className={`block py-1.5 text-sm font-body transition-colors duration-200 ${
                              isActive(item.href)
                                ? "text-brand font-medium"
                                : "text-gray-600 hover:text-brand"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom row */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/services"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-2 text-brand text-sm font-body font-semibold hover:text-brand-dark transition-colors duration-200"
                >
                  View All Services
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact-us"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-black px-5 py-2.5 rounded-md text-sm font-body font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          MOBILE MENU — slides in from right
          ════════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Image
            src="/images/bonardi-logo.webp"
            alt="Bonardi Construction"
            width={150}
            height={38}
            className="h-8 w-auto"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-gray-500 hover:text-brand transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
          <nav className="flex-1 px-6 pt-4 pb-6">
            {/* Main links with staggered entrance */}
            {mobileLinks.map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-4 border-b border-gray-100 text-lg font-display font-semibold transition-all duration-500 ${
                  mobileOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                } ${isActive(item.href) ? "text-brand" : "text-gray-900 hover:text-brand"}`}
                style={{
                  transitionDelay: mobileOpen ? `${100 + i * 60}ms` : "0ms",
                }}
              >
                {item.name}
              </Link>
            ))}

            {/* Services accordion */}
            <div
              className={`border-b border-gray-100 transition-all duration-500 ${
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${100 + mobileLinks.length * 60}ms` : "0ms",
              }}
            >
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-4 text-lg font-display font-semibold text-gray-900 hover:text-brand transition-colors"
              >
                Services
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  mobileServicesOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 space-y-6">
                  {serviceColumns.map((col) => (
                    <div key={col.heading}>
                      <p className="text-xs font-body font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {col.heading}
                      </p>
                      <div className="space-y-1">
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-1.5 text-sm font-body transition-colors duration-200 ${
                              isActive(item.href)
                                ? "text-brand font-medium"
                                : "text-gray-600 hover:text-brand"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-1 text-brand text-sm font-body font-semibold mt-2"
                  >
                    View All Services
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile footer */}
          <div className="mt-auto px-6 py-6 bg-gray-50 border-t border-gray-100">
            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-black py-3.5 rounded-md font-body font-semibold text-base transition-all duration-300"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:7187623400"
              className="flex items-center justify-center gap-2 mt-3 text-brand font-body font-semibold text-base hover:text-brand-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              718.762.3400
            </a>
            <p className="text-gray-400 text-xs text-center font-mono mt-4">
              NYC Lic: #1274180 &middot; Nassau: #H0446880000 &middot; Suffolk: #57853-H
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
