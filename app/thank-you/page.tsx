import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Bonardi Construction. We'll be in touch within one business day.",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-obsidian">
      <div className="text-center px-6 max-w-lg">
        <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display font-bold text-3xl text-ivory mb-4">Thank You</h1>
        <div className="gold-rule max-w-xs mx-auto my-6" />
        <p className="font-body text-ash mb-8 leading-relaxed">
          Your message has been received. Our team will review your project details and
          get back to you within one business day.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-gold hover:bg-gold-light text-obsidian px-6 py-3 font-body font-semibold text-sm tracking-wide transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border border-slate hover:border-gold text-ash hover:text-gold px-6 py-3 font-body font-medium text-sm tracking-wide transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
