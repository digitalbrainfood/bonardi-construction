import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/blog-data";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Construction tips, project spotlights, and industry insights from the team at Bonardi Construction.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bonardi Construction Blog",
    description:
      "Construction tips, project spotlights, and industry insights from the team at Bonardi Construction.",
    url: "https://bonardiconst.com/blog",
    publisher: {
      "@type": "LocalBusiness",
      "@id": "https://bonardiconst.com/#organization",
      name: "Bonardi Construction, Inc.",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://bonardiconst.com/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Organization",
        name: "Bonardi Construction, Inc.",
      },
      publisher: {
        "@type": "Organization",
        name: "Bonardi Construction, Inc.",
      },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      {/* Header */}
      <section className="pt-16 pb-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Insights</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-black dark:text-white">
            Construction{" "}
            <em className="italic text-brand">Knowledge</em>
            <br />
            Worth Reading.
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <div className="mb-16">
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group grid lg:grid-cols-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-card dark:shadow-none hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-[16/9] lg:aspect-auto relative overflow-hidden">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-brand tracking-widest mb-4 block">
                  {posts[0].category} · {posts[0].date}
                </span>
                <h2 className="font-display font-bold text-2xl text-black dark:text-white mb-4 group-hover:text-brand transition-colors duration-300">
                  {posts[0].title}
                </h2>
                <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-2 text-brand text-sm font-body font-medium">
                  Read article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="px-8 pb-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono text-brand tracking-widest">{post.category}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-[10px] font-mono">{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-semibold text-black dark:text-white text-lg mb-3 group-hover:text-brand transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-body text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-gray-400 dark:text-gray-500 text-xs font-body">{post.date}</span>
                    <svg
                      className="w-4 h-4 text-brand -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
