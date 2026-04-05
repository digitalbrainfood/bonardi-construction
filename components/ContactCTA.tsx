import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="relative py-28 bg-charcoal border-t border-slate overflow-hidden">
      {/* Background architectural shape */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-gold/[0.04] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-slate/40 rotate-12 -translate-x-32 translate-y-16 pointer-events-none" />
      <div className="absolute top-0 right-16 w-32 h-32 border border-gold/10 rotate-45 -translate-y-16 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">Get Started</span>
            </div>
            <h2 className="font-display font-bold text-display-xl text-ivory mb-6">
              Ready to Build
              <br />
              <em className="italic text-gold">Something Great?</em>
            </h2>
            <p className="font-body text-ash text-lg leading-relaxed max-w-lg">
              Request a free, no-obligation quote. Our team will review your project and
              respond within one business day with a clear, detailed estimate.
            </p>
          </div>

          {/* Right — contact actions */}
          <div className="lg:col-span-5">
            <div className="bg-carbon border border-slate p-8 space-y-6">
              <div>
                <p className="section-label mb-2">Call or Text</p>
                <a
                  href="tel:7187623400"
                  className="font-display text-3xl text-ivory hover:text-gold transition-colors"
                >
                  718.762.3400
                </a>
              </div>
              <div className="gold-rule" />
              <div>
                <p className="section-label mb-2">Fax</p>
                <span className="font-body text-ash">718.762.8606</span>
              </div>
              <div className="gold-rule" />
              <div>
                <p className="section-label mb-2">Email</p>
                <a
                  href="mailto:Info@bonardiconst.com"
                  className="font-body text-ash hover:text-gold transition-colors"
                >
                  Info@bonardiconst.com
                </a>
              </div>
              <div className="gold-rule" />
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-obsidian w-full py-4 font-body font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/25"
              >
                Request a Free Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
