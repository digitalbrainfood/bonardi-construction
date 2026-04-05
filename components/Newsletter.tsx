"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success";

export default function Newsletter({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status !== "idle") return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  }

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <svg
          className="w-5 h-5 text-accent flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-white font-body text-sm">Subscribed!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-l-md px-4 py-3 font-body text-sm flex-1 min-w-0 focus:outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-accent text-black font-body font-semibold rounded-r-md px-6 py-3 text-sm hover:bg-accent-dark transition-colors disabled:opacity-70 flex items-center gap-2 flex-shrink-0"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}
