"use client";

import { useState } from "react";

const serviceOptions = [
  "Asphalt Services",
  "Bathroom Remodeling",
  "Concrete & Blacktop",
  "Construction Management",
  "Demolition",
  "Dormer Additions",
  "Drainage",
  "Excavation",
  "Fire Damage Restoration",
  "Flooring",
  "Foundation Repair",
  "Framing",
  "Generac Generators",
  "Hardscaping",
  "Home Additions & Extensions",
  "Kitchen Remodeling",
  "Masonry & Brick Pointing",
  "New Construction",
  "Office Buildouts",
  "Roofing",
  "Sheetrock & Painting",
  "Sidewalk Repairs",
  "Waterproofing",
  "Water & Mold Restoration",
  "Other",
];

type QuoteFormProps = {
  preselectedService?: string;
  variant?: "full" | "compact";
  className?: string;
};

export default function QuoteForm({ preselectedService, variant = "full", className = "" }: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "",
    address: "",
    message: "",
    type: "" as "residential" | "commercial" | "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center justify-center py-10 text-center ${className}`}>
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-2">Message Sent</h3>
        <p className="text-gray-600 dark:text-gray-400 font-body text-sm">
          We&apos;ll review your project and respond within one business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-brand focus:ring-1 focus:ring-brand/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-body text-sm px-4 py-3 rounded-lg outline-none transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {variant === "full" && (
        <div>
          <p className="section-label mb-3">Project Type</p>
          <div className="flex gap-2">
            {(["residential", "commercial"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2.5 text-sm font-body font-medium tracking-wide rounded-lg transition-all duration-200 capitalize ${
                  form.type === t
                    ? "bg-brand text-white shadow-brand"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="qf-name" name="name" required value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-phone">
            Phone <span className="text-red-500">*</span>
          </label>
          <input id="qf-phone" name="phone" required type="tel" value={form.phone} onChange={handleChange} placeholder="(718) 000-0000" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-email">
          Email <span className="text-red-500">*</span>
        </label>
        <input id="qf-email" name="email" required type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass} />
      </div>

      <div>
        <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-service">
          Service Needed
        </label>
        <select id="qf-service" name="service" value={form.service} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
          <option value="">Select a service…</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {variant === "full" && (
        <div>
          <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-address">
            Project Address
          </label>
          <input id="qf-address" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Queens, NY 11354" className={inputClass} />
        </div>
      )}

      <div>
        <label className="block text-xs font-body font-medium text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="qf-message">
          Project Details {variant === "full" && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id="qf-message"
          name="message"
          required={variant === "full"}
          rows={variant === "compact" ? 3 : 5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-dark disabled:opacity-60 text-black py-3.5 rounded-lg font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg"
      >
        {status === "submitting" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            {variant === "compact" ? "Get Free Quote" : "Request Your Free Quote"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-xs font-body text-center">Something went wrong. Please call us at 718.762.3400.</p>
      )}

      {variant === "full" && (
        <p className="text-gray-400 dark:text-gray-500 text-xs font-body text-center">
          We respond within one business day. No spam, ever.
        </p>
      )}
    </form>
  );
}
