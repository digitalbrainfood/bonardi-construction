"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

const messages = [
  { name: "John", location: "Queens", action: "just requested a quote" },
  { name: "Sarah", location: "Bayside", action: "viewed Roofing Services" },
  { name: "Mike", location: "Garden City", action: "requested a free estimate" },
  { name: "Lisa", location: "Brooklyn", action: "viewed Masonry Services" },
  { name: "David", location: "Nassau County", action: "just requested a quote" },
  { name: "Angela", location: "Huntington", action: "viewed Paving Services" },
];

function randomDelay() {
  // 2-5 minutes in ms
  return (120 + Math.random() * 180) * 1000;
}

export default function SocialProof() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const shuffled = useRef(false);

  // Don't show on admin pages
  if (pathname?.startsWith("/admin")) return null;

  const dismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem("socialProofDismissed", "true");
    } catch {}
  }, []);

  // Shuffle starting index once
  useEffect(() => {
    if (!shuffled.current) {
      setCurrentIndex(Math.floor(Math.random() * messages.length));
      shuffled.current = true;
    }
  }, []);

  useEffect(() => {
    // Check if permanently dismissed this session
    try {
      if (sessionStorage.getItem("socialProofDismissed") === "true") {
        setDismissed(true);
        return;
      }
    } catch {}

    // Initial delay: 30-60 seconds
    const initialDelay = (30 + Math.random() * 30) * 1000;
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (dismissed) return;

    if (visible) {
      // Show for 5 seconds then hide
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(hideTimer);
    } else {
      // Wait 2-5 minutes before showing next
      const delay = randomDelay();
      const showTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, delay);
      return () => clearTimeout(showTimer);
    }
  }, [visible, dismissed]);

  if (dismissed) return null;

  const msg = messages[currentIndex];
  const initials = msg.name[0];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center gap-3 max-w-xs border border-gray-100 dark:border-gray-700">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-body font-semibold text-gray-500 dark:text-gray-400">
            {initials}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-body text-gray-800 dark:text-gray-200 leading-snug">
            <span className="font-semibold">{msg.name}</span> from{" "}
            <span className="font-semibold">{msg.location}</span>{" "}
            {msg.action}
          </p>
          <p className="text-[10px] font-mono text-gray-400 mt-0.5">Just now</p>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
