"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Hide when footer is in view ── */
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* ── Close on click outside ── */
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    },
    []
  );

  useEffect(() => {
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, handleClickOutside]);

  const actions = [
    {
      href: "/contact-us",
      type: "link" as const,
      label: "Get Quote",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4"
          />
        </svg>
      ),
    },
    {
      href: "mailto:Info@bonardiconst.com",
      type: "anchor" as const,
      label: "Email Us",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
          />
        </svg>
      ),
    },
    {
      href: "tel:7187623400",
      type: "anchor" as const,
      label: "718.762.3400",
      icon: (
        <svg
          className="h-5 w-5 text-brand"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-20 z-40 flex flex-col items-end transition-all duration-300 ${
        hidden
          ? "opacity-0 translate-y-4 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      {/* ── Action Items ── */}
      <div
        className={`mb-3 flex flex-col gap-2 transition-all duration-300 ${
          expanded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {actions.map((action, i) => {
          const className =
            "flex items-center gap-3 whitespace-nowrap rounded-lg bg-white px-4 py-3 shadow-card font-body text-sm font-medium text-gray-800 transition-all duration-200 hover:shadow-card-hover hover:text-brand";

          const style = {
            transitionDelay: expanded ? `${i * 50}ms` : "0ms",
          };

          const content = (
            <>
              {action.icon}
              {action.label}
            </>
          );

          return action.type === "link" ? (
            <Link
              key={action.label}
              href={action.href}
              className={className}
              style={style}
            >
              {content}
            </Link>
          ) : (
            <a
              key={action.label}
              href={action.href}
              className={className}
              style={style}
            >
              {content}
            </a>
          );
        })}
      </div>

      {/* ── Main Button ── */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        aria-label={expanded ? "Close contact menu" : "Open contact menu"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-brand-lg transition-all duration-300 hover:bg-brand-dark"
      >
        {/* Pulse ring */}
        {!expanded && (
          <span className="absolute inset-0 animate-floating-pulse rounded-full bg-brand/40" />
        )}

        {/* Icon — phone when closed, X when open */}
        {expanded ? (
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
