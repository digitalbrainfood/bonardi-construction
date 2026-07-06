import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { getSitePage, orDefault } from "@/lib/site-pages";

export const revalidate = 300;

// Base metadata (title, description, canonical, OpenGraph) lives in
// app/contact-us/layout.tsx; these page-level fields override it only
// when the admin has saved non-empty SEO values.
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSitePage("contact");
  const meta: Metadata = {};
  if (content.seo?.title?.trim()) meta.title = content.seo.title;
  if (content.seo?.description?.trim()) meta.description = content.seo.description;
  return meta;
}

export default async function ContactPage() {
  const content = await getSitePage("contact");
  const info = content.contactInfo ?? {};
  const phone = orDefault(info.phone, "718.762.3400");
  const fax = orDefault(info.fax, "718.762.8606");
  const email = orDefault(info.email, "Info@bonardiconst.com");

  return (
    <>
      {/* Page header */}
      <section className="pt-16 pb-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">{orDefault(content.hero?.subtitle, "Contact")}</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-black dark:text-white">
            {content.hero?.title?.trim() ? (
              content.hero.title
            ) : (
              <>
                Let&apos;s Build
                <br />
                <em className="italic text-brand">Together.</em>
              </>
            )}
          </h1>
          {content.hero?.description?.trim() ? (
            <p className="font-body text-gray-600 dark:text-gray-400 text-lg mt-6 max-w-2xl">
              {content.hero.description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
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
                      value: phone,
                      href: "tel:" + phone.replace(/\D/g, ""),
                    },
                    {
                      label: "Fax",
                      value: fax,
                      href: undefined,
                    },
                    {
                      label: "Email",
                      value: email,
                      href: "mailto:" + email,
                    },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <p className="text-gray-400 dark:text-gray-500 text-xs font-mono tracking-widest mb-1">{label.toUpperCase()}</p>
                      {href ? (
                        <a href={href} className="text-black dark:text-white hover:text-brand font-body text-lg transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-400 font-body text-lg">{value}</span>
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
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-body">{region}</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">{lic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="brand-rule" />

              {/* Service area */}
              <div>
                <p className="section-label mb-4">Service Area</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                  {content.serviceAreas?.length
                    ? content.serviceAreas.join(" · ")
                    : "Queens · Brooklyn · Nassau County · Suffolk County · Long Island and beyond"}
                </p>
              </div>

              {/* Hours */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="section-label mb-4">Business Hours</p>
                <div className="space-y-2 text-sm font-body">
                  {info.hours?.trim() ? (
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{info.hours}</p>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Monday – Friday</span>
                        <span className="text-black dark:text-white">7:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Saturday</span>
                        <span className="text-black dark:text-white">8:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Sunday</span>
                        <span className="text-gray-400 dark:text-gray-500">By Appointment</span>
                      </div>
                    </>
                  )}
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
