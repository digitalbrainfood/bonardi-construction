"use client";

import { useState } from "react";

const services = [
  "Asphalt Services",
  "Concrete & Blacktop",
  "Construction Management",
  "Demolition",
  "Drainage",
  "Excavation",
  "Fire Damage Restoration",
  "Flooring",
  "Foundation Repair",
  "Framing",
  "Generac Generators",
  "Hardscaping",
  "Home Additions & Extensions",
  "Masonry & Brick Pointing",
  "New Construction",
  "Office Buildouts",
  "Roofing",
  "Sidewalk Repairs",
  "Waterproofing",
  "Water & Mold Restoration",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  message: string;
  type: "residential" | "commercial" | "";
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    address: "",
    message: "",
    type: "",
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

  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-12 bg-carbon border-b border-slate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">Contact</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-ivory">
            Let&apos;s Build
            <br />
            <em className="italic text-gold">Together.</em>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left — info */}
            <div className="lg:col-span-4 space-y-10">
              {/* Contact details */}
              <div>
                <p className="section-label mb-5">Reach Us</p>
                <div className="space-y-6">
                  {[
                    {
                      label: "Phone",
                      value: "718.762.3400",
                      href: "tel:7187623400",
                    },
                    {
                      label: "Fax",
                      value: "718.762.8606",
                      href: undefined,
                    },
                    {
                      label: "Email",
                      value: "Info@bonardiconst.com",
                      href: "mailto:Info@bonardiconst.com",
                    },
                  ].map(({ label, value, href }) => (
                    <div key={label}>
                      <p className="text-stone text-xs font-mono tracking-widest mb-1">{label.toUpperCase()}</p>
                      {href ? (
                        <a href={href} className="text-ivory hover:text-gold font-body text-lg transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-ash font-body text-lg">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="gold-rule" />

              {/* Licenses */}
              <div>
                <p className="section-label mb-4">Licenses</p>
                <div className="space-y-2">
                  {[
                    ["NYC", "#1274180"],
                    ["Nassau County", "#H0446880000"],
                    ["Suffolk County", "#57853-H"],
                  ].map(([region, lic]) => (
                    <div key={region} className="flex items-center justify-between">
                      <span className="text-cement text-sm font-body">{region}</span>
                      <span className="text-ash text-sm font-mono">{lic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gold-rule" />

              {/* Service area */}
              <div>
                <p className="section-label mb-4">Service Area</p>
                <p className="text-ash text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island and beyond
                </p>
              </div>

              {/* Hours */}
              <div className="bg-charcoal border border-slate p-6">
                <p className="section-label mb-4">Business Hours</p>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-cement">Monday – Friday</span>
                    <span className="text-ivory">7:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cement">Saturday</span>
                    <span className="text-ivory">8:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cement">Sunday</span>
                    <span className="text-stone">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-ivory mb-3">Message Received</h2>
                  <p className="text-ash font-body max-w-md">
                    Thank you — we'll review your project details and get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project type toggle */}
                  <div>
                    <p className="section-label mb-3">Project Type</p>
                    <div className="flex gap-px">
                      {(["residential", "commercial"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, type: t }))}
                          className={`flex-1 py-3 text-sm font-body font-medium tracking-wide transition-all duration-200 capitalize ${
                            form.type === t
                              ? "bg-gold text-obsidian"
                              : "bg-charcoal text-cement hover:text-ivory border border-slate"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="section-label block mb-2" htmlFor="name">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full bg-charcoal border border-slate focus:border-gold text-ivory placeholder:text-stone font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="section-label block mb-2" htmlFor="phone">
                        Phone Number <span className="text-gold">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(718) 000-0000"
                        className="w-full bg-charcoal border border-slate focus:border-gold text-ivory placeholder:text-stone font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="email">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-charcoal border border-slate focus:border-gold text-ivory placeholder:text-stone font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200"
                    />
                  </div>

                  {/* Service select */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="service">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-charcoal border border-slate focus:border-gold text-ivory font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="text-stone">Select a service…</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="address">
                      Project Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Queens, NY 11354"
                      className="w-full bg-charcoal border border-slate focus:border-gold text-ivory placeholder:text-stone font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="section-label block mb-2" htmlFor="message">
                      Project Details <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your project — scope, timeline, any specific requirements…"
                      className="w-full bg-charcoal border border-slate focus:border-gold text-ivory placeholder:text-stone font-body text-sm px-4 py-3.5 outline-none transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-3 bg-gold hover:bg-gold-light disabled:opacity-60 text-obsidian py-4 font-body font-semibold text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-gold/25"
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
                        Request Your Free Quote
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-stone text-xs font-body text-center">
                    We respond within one business day. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
