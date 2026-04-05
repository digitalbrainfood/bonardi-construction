import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { name: "Asphalt Services", href: "/services/asphalt" },
  { name: "Concrete & Blacktop", href: "/services/concrete" },
  { name: "Masonry & Brick Pointing", href: "/services/masonry-brick-pointing" },
  { name: "Roofing", href: "/services/roofing-services" },
  { name: "New Construction", href: "/services/new-construction" },
  { name: "Foundation Repair", href: "/services/foundation-repair-restoration" },
  { name: "Home Additions", href: "/services/home-additions-extensions" },
  { name: "Fire Restoration", href: "/services/fire-damage-restoration" },
  { name: "Waterproofing", href: "/services/waterproofing" },
  { name: "Hardscaping", href: "/services/hardscaping" },
  { name: "Demolition", href: "/services/demolition" },
  { name: "Water & Mold Restoration", href: "/services/water-and-mold-restoration" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Gary M. Bonelli", href: "/gary-m-bonelli" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Areas We Serve", href: "/areas-we-serve" },
  { name: "Contact", href: "/contact-us" },
];

const partners = [
  "Lead-Safe Certified",
  "Generac",
  "Cambridge",
  "Nicolock",
  "Unilock",
];

export default function Footer() {
  return (
    <footer className="bg-[#001a3a] text-white">
      {/* ── Main Footer ── */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ─ Brand Column ─ */}
          <div>
            <Link href="/" aria-label="Bonardi Construction home">
              <Image
                src="/images/bonardi-footer-logo.webp"
                alt="Bonardi Construction"
                width={180}
                height={50}
                className="h-auto w-[180px]"
              />
            </Link>

            <p className="mt-5 font-body text-sm leading-relaxed text-white/70">
              Over 30 years of trusted general contracting throughout Queens,
              Brooklyn, Nassau&nbsp;County, Suffolk&nbsp;County &amp;&nbsp;Long&nbsp;Island.
            </p>

            {/* Licenses */}
            <div className="mt-6 space-y-1">
              <p className="font-mono text-[11px] tracking-wide text-white/50">
                NYC Lic #1274180
              </p>
              <p className="font-mono text-[11px] tracking-wide text-white/50">
                Nassau #H0446880000
              </p>
              <p className="font-mono text-[11px] tracking-wide text-white/50">
                Suffolk #57853-H
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/Bonardiconstruction/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 transition-colors hover:border-accent hover:text-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bonardiconstruction/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* ─ Services Column ─ */}
          <div>
            <h4 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Company Column ─ */}
          <div>
            <h4 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─ Contact Column ─ */}
          <div>
            <h4 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </h4>

            <div className="space-y-4">
              {/* Phone */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  Phone
                </p>
                <a
                  href="tel:7187623400"
                  className="mt-0.5 block font-body text-sm text-white transition-colors hover:text-accent"
                >
                  718.762.3400
                </a>
              </div>

              {/* Fax */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  Fax
                </p>
                <span className="mt-0.5 block font-body text-sm text-white/70">
                  718.762.8606
                </span>
              </div>

              {/* Email */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  Email
                </p>
                <a
                  href="mailto:Info@bonardiconst.com"
                  className="mt-0.5 block font-body text-sm text-white transition-colors hover:text-accent"
                >
                  Info@bonardiconst.com
                </a>
              </div>

              {/* Service Area */}
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  Service Area
                </p>
                <p className="mt-0.5 font-body text-sm leading-relaxed text-white/70">
                  Queens&nbsp;&middot; Brooklyn&nbsp;&middot; Nassau&nbsp;&middot; Suffolk&nbsp;&middot; Long&nbsp;Island
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-body text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
                >
                  Get a Free Quote
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Partner Bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
            Certified Partners
          </span>
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          {partners.map((partner) => (
            <span
              key={partner}
              className="font-body text-xs text-white/50"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      {/* ── Copyright Bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="font-body text-xs text-white/40">
            &copy; 2026 Bonardi Construction, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-body text-xs text-white/40">
              Privacy Policy
            </span>
            <span className="font-body text-xs text-white/40">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
