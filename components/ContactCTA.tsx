"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactCTA() {
  return (
    <section className="relative py-28 bg-brand overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/10 rounded-full -translate-x-32 translate-y-16 pointer-events-none" />
      <div className="absolute top-0 right-16 w-32 h-32 border border-white/10 rounded-full -translate-y-16 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="slide-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-white" />
                <span className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-white">
                  Get Started
                </span>
              </div>
              <h2 className="font-display font-bold text-display-xl text-white mb-6">
                Ready to Build
                <br />
                <em className="italic text-accent">Something Great?</em>
              </h2>
              <p className="font-body text-brand-100 text-lg leading-relaxed max-w-lg">
                Request a free, no-obligation quote. Our team will review your project and
                respond within one business day with a clear, detailed estimate.
              </p>
            </ScrollReveal>
          </div>

          {/* Right -- contact card */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="slide-right" delay={200}>
              <div className="bg-white rounded-lg shadow-brand-lg p-8 space-y-6">
                <div>
                  <p className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand mb-2">
                    Call or Text
                  </p>
                  <a
                    href="tel:7187623400"
                    className="font-display text-3xl text-gray-900 hover:text-brand transition-colors"
                  >
                    718.762.3400
                  </a>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <p className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand mb-2">
                    Fax
                  </p>
                  <span className="font-body text-gray-600">718.762.8606</span>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <p className="font-mono text-xs font-medium tracking-[0.2em] uppercase text-brand mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:Info@bonardiconst.com"
                    className="font-body text-gray-600 hover:text-brand transition-colors"
                  >
                    Info@bonardiconst.com
                  </a>
                </div>
                <hr className="border-gray-200" />
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-dark text-black w-full py-4 font-body font-semibold text-base tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                >
                  Request a Free Quote
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
