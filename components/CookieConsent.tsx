"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so the slide-up animation is visible
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    setExiting(true);
    localStorage.setItem("cookie-consent", "accepted");
    setTimeout(() => setVisible(false), 300);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 ease-out ${
        exiting ? "translate-y-full" : "translate-y-0 animate-[slide-up_0.4s_ease-out]"
      }`}
      style={
        !exiting
          ? {
              animation: "slide-up 0.4s ease-out forwards",
            }
          : undefined
      }
    >
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
          We use cookies to improve your experience.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-brand text-sm font-body underline hover:text-brand-dark transition-colors"
          >
            Learn More
          </a>
          <button
            onClick={handleAccept}
            className="bg-brand text-white rounded-md px-4 py-2 text-sm font-body font-medium hover:bg-brand-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
