"use client";

import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Contact</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-black">
            Let&apos;s Build
            <br />
            <em className="italic text-brand">Together.</em>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
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
                    <div key={label} className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-400 text-xs font-mono tracking-widest mb-1">{label.toUpperCase()}</p>
                      {href ? (
                        <a href={href} className="text-black hover:text-brand font-body text-lg transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-gray-600 font-body text-lg">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="brand-rule" />

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
                      <span className="text-gray-500 text-sm font-body">{region}</span>
                      <span className="text-gray-700 text-sm font-mono">{lic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="brand-rule" />

              {/* Service area */}
              <div>
                <p className="section-label mb-4">Service Area</p>
                <p className="text-gray-600 text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island and beyond
                </p>
              </div>

              {/* Hours */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="section-label mb-4">Business Hours</p>
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday – Friday</span>
                    <span className="text-black">7:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="text-black">8:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="text-gray-400">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-8">
              <QuoteForm variant="full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
