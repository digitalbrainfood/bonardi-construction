import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import QuoteForm from "@/components/QuoteForm";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bonardiconst.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Bonardi Construction, Inc."],
      images: [
        {
          url: post.image,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const sidebarRelated = getRelatedPosts(post.slug, post.category, 2);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://bonardiconst.com/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image,
    author: {
      "@type": "Person",
      name: "Gary M. Bonelli",
      jobTitle: "Owner & Principal Contractor",
      url: "https://bonardiconst.com/gary-m-bonelli",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://bonardiconst.com/#organization",
      name: "Bonardi Construction, Inc.",
      logo: {
        "@type": "ImageObject",
        url: "https://bonardiconst.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bonardiconst.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs font-mono tracking-wider">
            <Link
              href="/"
              className="text-gray-400 dark:text-gray-500 hover:text-brand transition-colors duration-200"
            >
              HOME
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <Link
              href="/blog"
              className="text-gray-400 dark:text-gray-500 hover:text-brand transition-colors duration-200"
            >
              BLOG
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-600 dark:text-gray-300 truncate max-w-[200px] sm:max-w-xs lg:max-w-md">
              {post.title.toUpperCase()}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="pt-12 pb-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <span className="inline-block text-[10px] font-mono text-brand tracking-widest uppercase mb-4">
            {post.category}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-display-lg text-black dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-body text-gray-500 dark:text-gray-400 mb-8">
            <time>{post.date}</time>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div
                className={[
                  "font-body text-gray-700 dark:text-gray-300 leading-relaxed",
                  "[&_h2]:font-display [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-black [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-4",
                  "[&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:text-black [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-3",
                  "[&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed",
                  "[&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2",
                  "[&_li]:text-base [&_li]:leading-relaxed [&_li]:text-gray-700 [&_li]:dark:text-gray-300",
                  "[&_strong]:text-black [&_strong]:dark:text-white [&_strong]:font-semibold",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Card */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-display font-bold text-lg">
                    GB
                  </div>
                  <div>
                    <p className="font-display font-semibold text-black dark:text-white text-sm">
                      Gary M. Bonelli
                    </p>
                    <p className="text-xs font-body text-gray-500 dark:text-gray-400">
                      Owner & Principal Contractor
                    </p>
                  </div>
                </div>
                <p className="text-sm font-body text-gray-600 dark:text-gray-400 leading-relaxed">
                  With over 30 years of experience in residential and commercial
                  construction, Gary leads the Bonardi Construction team across
                  Queens, Brooklyn, Nassau County, and Long Island.
                </p>
              </div>

              {/* Related Posts */}
              {sidebarRelated.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="font-display font-bold text-sm text-black dark:text-white mb-4 tracking-wide uppercase">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {sidebarRelated.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-medium text-sm text-black dark:text-white group-hover:text-brand transition-colors duration-200 leading-snug line-clamp-2">
                            {related.title}
                          </p>
                          <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1">
                            {related.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-display font-bold text-lg text-black dark:text-white mb-2">
                  Get a Free Quote
                </h3>
                <p className="text-sm font-body text-gray-600 dark:text-gray-400 mb-5">
                  Ready to start your project? Fill out the form below and
                  we&apos;ll get back to you within one business day.
                </p>
                <QuoteForm variant="compact" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Keep Reading</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-black dark:text-white mb-10">
            More Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="px-8 py-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-brand tracking-widest">
                      {related.category}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-mono">
                      {related.readTime}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-black dark:text-white text-lg mb-3 group-hover:text-brand transition-colors duration-300 leading-snug">
                    {related.title}
                  </h3>
                  <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">
                    {related.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-gray-400 dark:text-gray-500 text-xs font-body">
                      {related.date}
                    </span>
                    <svg
                      className="w-4 h-4 text-brand -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
