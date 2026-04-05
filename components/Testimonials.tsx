"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  projectType: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Bonardi Construction transformed our backyard into a stunning outdoor living space. The stone patio and retaining walls exceeded our expectations. Their attention to detail is unmatched.",
    name: "Maria S.",
    projectType: "Hardscaping",
    location: "Bayside, NY",
    rating: 5,
  },
  {
    quote:
      "After our house fire, they handled everything from demolition to rebuild. Their team was compassionate, professional, and delivered our home back better than before. We are forever grateful.",
    name: "Robert K.",
    projectType: "Fire Restoration",
    location: "Flushing, NY",
    rating: 5,
  },
  {
    quote:
      "Best roofing contractor we've used in over 20 years. They replaced our entire roof in two days, cleaned up perfectly, and the price was very fair. Highly recommend to anyone on Long Island.",
    name: "James & Linda P.",
    projectType: "Roofing",
    location: "Garden City, NY",
    rating: 5,
  },
  {
    quote:
      "They repaved our entire commercial parking lot over a weekend to minimize business disruption. The asphalt work is flawless and has held up beautifully through two harsh winters already.",
    name: "David M.",
    projectType: "Asphalt Paving",
    location: "Nassau County",
    rating: 5,
  },
  {
    quote:
      "Foundation issues had us worried we'd lose our home. Bonardi's team assessed the damage quickly, explained every step, and completed the repair on time and on budget. True professionals.",
    name: "Sarah T.",
    projectType: "Foundation Repair",
    location: "Queens, NY",
    rating: 5,
  },
  {
    quote:
      "Professional from start to finish. Our new construction project was completed on schedule with exceptional craftsmanship. Gary personally oversaw every phase. We couldn't be happier.",
    name: "Michael R.",
    projectType: "New Construction",
    location: "Suffolk County",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-accent" : "text-gray-200 dark:text-gray-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const totalPages = Math.ceil(testimonials.length / 3);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  /* ── Auto-rotate ── */
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(nextPage, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextPage]);

  const visibleTestimonials = testimonials.slice(
    currentPage * 3,
    currentPage * 3 + 3
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-section">
      <div className="mx-auto max-w-7xl px-6">
        {/* ── Section Header ── */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Testimonials
          </span>
          <h2 className="font-display text-display-lg text-gray-900 dark:text-gray-100">
            What Our Clients Say
          </h2>
        </div>

        {/* ── Cards Grid ── */}
        <div
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleTestimonials.map((testimonial, i) => (
            <div
              key={`${currentPage}-${i}`}
              className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 shadow-card dark:shadow-none transition-shadow duration-300 hover:shadow-card-hover animate-fade-in"
            >
              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote className="mt-5 flex-1 font-body text-gray-700 dark:text-gray-300 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="my-5 h-px bg-gray-200 dark:bg-gray-700" />

              {/* Attribution */}
              <div>
                <p className="font-body font-semibold text-gray-900 dark:text-gray-100">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 font-body text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.projectType} &middot; {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Navigation Dots ── */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-brand scale-110"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
