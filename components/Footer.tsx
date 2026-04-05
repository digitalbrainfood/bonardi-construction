import Link from "next/link";

const serviceLinks = [
  { name: "Asphalt Services", href: "/services/asphalt" },
  { name: "Concrete & Blacktop", href: "/services/concrete" },
  { name: "Masonry & Brick Pointing", href: "/services/masonry" },
  { name: "Roofing", href: "/services/roofing" },
  { name: "New Construction", href: "/services/new-construction" },
  { name: "Foundation Repair", href: "/services/foundation-repair" },
  { name: "Home Additions", href: "/services/home-additions" },
  { name: "Fire Restoration", href: "/services/fire-damage-restoration" },
  { name: "Waterproofing", href: "/services/waterproofing" },
  { name: "Hardscaping", href: "/services/hardscaping" },
  { name: "Demolition", href: "/services/demolition" },
  { name: "Water & Mold Restoration", href: "/services/water-mold-restoration" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Gary M. Bonelli", href: "/about#gary-m-bonelli" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Request a Quote", href: "/contact#quote" },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-slate">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <div className="w-7 h-7 relative">
                <div className="absolute inset-0 border-2 border-gold rotate-45" />
                <div className="absolute inset-[5px] bg-gold rotate-45" />
              </div>
              <div>
                <span className="font-display font-bold text-ivory text-base leading-none block">
                  BONARDI
                </span>
                <span className="font-mono text-[8px] tracking-[0.25em] text-gold uppercase block mt-0.5">
                  Construction, Inc.
                </span>
              </div>
            </Link>

            <p className="font-body text-cement text-sm leading-relaxed mb-6">
              30+ years of expert general contracting across Queens, Brooklyn,
              Nassau & Suffolk County.
            </p>

            {/* Licenses */}
            <div className="space-y-1.5 mb-6">
              {[
                "NYC Lic: #1274180",
                "Nassau: #H0446880000",
                "Suffolk: #57853-H",
              ].map((lic) => (
                <p key={lic} className="font-mono text-stone text-xs">{lic}</p>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Bonardiconstruction/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-slate hover:border-gold flex items-center justify-center text-stone hover:text-gold transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/bonardiconstruction/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-slate hover:border-gold flex items-center justify-center text-stone hover:text-gold transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="section-label mb-5">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cement hover:text-gold text-sm font-body transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h4 className="section-label mb-5">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cement hover:text-gold text-sm font-body transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h4 className="section-label mb-5">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-stone text-xs font-mono mb-1">PHONE</p>
                <a
                  href="tel:7187623400"
                  className="text-ivory hover:text-gold font-body text-sm transition-colors"
                >
                  718.762.3400
                </a>
              </div>
              <div>
                <p className="text-stone text-xs font-mono mb-1">FAX</p>
                <span className="text-ash font-body text-sm">718.762.8606</span>
              </div>
              <div>
                <p className="text-stone text-xs font-mono mb-1">EMAIL</p>
                <a
                  href="mailto:Info@bonardiconst.com"
                  className="text-ash hover:text-gold font-body text-sm transition-colors"
                >
                  Info@bonardiconst.com
                </a>
              </div>
              <div>
                <p className="text-stone text-xs font-mono mb-2">SERVICE AREA</p>
                <p className="text-cement text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-obsidian px-5 py-3 text-sm font-body font-semibold transition-all duration-300"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner logos bar */}
      <div className="border-t border-slate">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-stone text-xs font-mono tracking-widest">CERTIFIED PARTNERS</span>
              <div className="w-px h-4 bg-slate" />
              <div className="flex items-center gap-6">
                {["Lead-Safe Certified", "Generac", "Cambridge", "Nicolock", "Unilock"].map((partner) => (
                  <span key={partner} className="text-cement text-xs font-body">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-slate/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-stone text-xs font-body">
            © {new Date().getFullYear()} Bonardi Construction, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-stone text-xs font-body">
              Privacy Policy
            </span>
            <span className="text-stone text-xs font-body">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
