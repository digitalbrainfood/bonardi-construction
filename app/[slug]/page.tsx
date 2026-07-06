import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser, createServiceClient } from "@/lib/supabase/api-auth";
import FAQ from "@/components/FAQ";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// Renders pages created in the admin page builder (the `pages` table).
// Published pages are public; drafts render only for logged-in admins with ?preview=true.
export const dynamic = "force-dynamic";

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
}

interface PageData {
  pageType?: string;
  hero?: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: string;
  };
  intro?: { heading?: string; content?: string };
  services?: ServiceItem[];
  benefits?: string[];
  process?: { step?: number; title: string; description: string }[];
  faq?: { question: string; answer: string }[];
  cta?: { title?: string; description?: string; buttonText?: string; buttonLink?: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
}

interface PageRow {
  slug: string;
  title: string;
  status: "draft" | "published";
  data: PageData | null;
}

async function fetchPage(
  slug: string,
  preview: boolean
): Promise<PageRow | null> {
  try {
    if (preview) {
      // Drafts are only visible to a logged-in admin.
      const user = await getAdminUser();
      if (!user) return null;
      const service = createServiceClient();
      const { data } = await service
        .from("pages")
        .select("slug,title,status,data")
        .eq("slug", slug)
        .maybeSingle();
      return (data as PageRow) ?? null;
    }
    const supabase = await createClient();
    const { data } = await supabase
      .from("pages")
      .select("slug,title,status,data")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return (data as PageRow) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview?: string };
}): Promise<Metadata> {
  const page = await fetchPage(params.slug, searchParams.preview === "true");
  if (!page) return {};
  const seo = page.data?.seo;
  return {
    title: seo?.metaTitle || page.title,
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    alternates: { canonical: seo?.canonicalUrl || `/${page.slug}` },
    openGraph: seo?.ogImage ? { images: [seo.ogImage] } : undefined,
    robots: page.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

export default async function DynamicPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview?: string };
}) {
  const page = await fetchPage(params.slug, searchParams.preview === "true");
  if (!page) notFound();

  const d = page.data ?? {};
  const hero = d.hero ?? {};
  const services = d.services ?? [];
  const benefits = d.benefits ?? [];
  const process = d.process ?? [];
  const faq = d.faq ?? [];
  const cta = d.cta ?? {};

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: page.title, url: `/${page.slug}` },
        ])}
      />

      {page.status === "draft" && (
        <div className="bg-accent text-black text-center text-sm font-body font-semibold py-2">
          Draft preview — this page is not publicly visible.
        </div>
      )}

      {/* Hero */}
      <section
        className="relative pt-20 pb-24 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
        style={
          hero.backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(0,26,58,0.82), rgba(0,26,58,0.82)), url(${hero.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-px ${hero.backgroundImage ? "bg-white" : "bg-brand"}`} />
            <span
              className={`font-mono text-xs font-medium tracking-[0.2em] uppercase ${
                hero.backgroundImage ? "text-white" : "text-brand"
              }`}
            >
              Bonardi Construction
            </span>
          </div>
          <h1
            className={`font-display font-bold text-display-xl max-w-3xl ${
              hero.backgroundImage ? "text-white" : "text-black dark:text-white"
            }`}
          >
            {hero.title || page.title}
            {hero.titleHighlight && (
              <>
                {" "}
                <em className="italic text-accent">{hero.titleHighlight}</em>
              </>
            )}
          </h1>
          {hero.description && (
            <p
              className={`font-body text-lg leading-relaxed mt-6 max-w-2xl ${
                hero.backgroundImage ? "text-white/85" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {hero.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href={hero.primaryButtonLink || "/contact-us"}
              className="flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-7 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
            >
              {hero.primaryButtonText || "Request a Free Quote"}
            </Link>
            {hero.secondaryButtonText && (
              <Link
                href={hero.secondaryButtonLink || "/services"}
                className={`flex items-center gap-3 border-2 px-7 py-4 rounded-lg font-body font-medium text-base tracking-wide transition-all duration-300 ${
                  hero.backgroundImage
                    ? "border-white text-white hover:bg-white hover:text-brand"
                    : "border-brand text-brand hover:bg-brand hover:text-white"
                }`}
              >
                {hero.secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-12">
              {/* Intro */}
              {(d.intro?.heading || d.intro?.content) && (
                <div>
                  {d.intro?.heading && (
                    <h2 className="font-display font-bold text-display-md text-black dark:text-white mb-4">
                      {d.intro.heading}
                    </h2>
                  )}
                  {d.intro?.content && (
                    <p className="font-body text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                      {d.intro.content}
                    </p>
                  )}
                </div>
              )}

              {/* Services */}
              {services.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-px bg-brand" />
                    <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                      What We Offer
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {services.map((s) => (
                      <div
                        key={s.title}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                      >
                        <h3 className="font-body font-semibold text-black dark:text-white mb-2">
                          {s.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                          {s.description}
                        </p>
                        {s.features && s.features.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {s.features.map((f) => (
                              <li key={f} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-brand rotate-45 mt-1.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400 text-xs font-body">
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-px bg-brand" />
                    <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                      Why Choose Us
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 bg-brand rotate-45 mt-2 flex-shrink-0" />
                        <span className="font-body text-gray-800 dark:text-gray-200 text-base">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {process.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-px bg-brand" />
                    <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                      Our Process
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {process.map((p, i) => (
                      <div key={p.title} className="flex items-start gap-5">
                        <span className="font-mono text-brand text-sm pt-0.5">
                          {String(p.step ?? i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-body font-semibold text-black dark:text-white mb-1">
                            {p.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {faq.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-6 h-px bg-brand" />
                    <h2 className="font-body font-semibold text-sm tracking-[0.15em] uppercase text-gray-700 dark:text-gray-300">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <FAQ items={faq} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <p className="section-label mb-5">Request a Quote</p>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  Get a free, no-obligation estimate for your project. We respond
                  within one business day.
                </p>
                <QuoteForm variant="compact" />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                <p className="section-label">Why Choose Bonardi</p>
                {[
                  "30+ years of licensed experience",
                  "NYC, Nassau & Suffolk licensed",
                  "Lead-Safe Certified Firm",
                  "Full project management",
                  "Transparent pricing, no surprises",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-brand text-xs">&#9670;</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-body">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="section-label mb-3">Service Area</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-body leading-relaxed">
                  Queens · Brooklyn · Nassau County · Suffolk County · Long Island
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              {cta.title || "Ready to start your project?"}
            </h2>
            <p className="font-body text-white/80">
              {cta.description || (
                <>
                  Call us at{" "}
                  <a href="tel:7187623400" className="text-white underline hover:text-accent transition-colors">
                    718.762.3400
                  </a>{" "}
                  or request a free quote online.
                </>
              )}
            </p>
          </div>
          <Link
            href={cta.buttonLink || "/contact-us"}
            className="flex-shrink-0 flex items-center gap-3 bg-accent hover:bg-accent-dark text-black px-8 py-4 rounded-lg font-body font-semibold text-base tracking-wide transition-all duration-300"
          >
            {cta.buttonText || "Get a Free Quote"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
