import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Construction tips, project spotlights, and industry insights from the team at Bonardi Construction.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "how-to-choose-a-general-contractor",
    title: "How to Choose a General Contractor in New York City",
    excerpt:
      "Navigating New York's dense contractor market takes more than a Google search. Here's what to ask, what to look for, and what red flags to avoid.",
    category: "Advice",
    date: "March 10, 2025",
    readTime: "5 min read",
  },
  {
    slug: "signs-your-asphalt-needs-attention",
    title: "5 Signs Your Asphalt Driveway Needs Attention Now",
    excerpt:
      "Small cracks become big problems fast in New York winters. Learn to identify the warning signs before a simple repair becomes a full replacement.",
    category: "Asphalt",
    date: "February 18, 2025",
    readTime: "4 min read",
  },
  {
    slug: "nyc-sidewalk-violation-guide",
    title: "The Complete Guide to NYC Sidewalk Violations",
    excerpt:
      "Property owners are liable for sidewalk conditions in front of their building. We break down how violations work, what they cost, and how to resolve them.",
    category: "Sidewalks",
    date: "January 22, 2025",
    readTime: "6 min read",
  },
  {
    slug: "waterproofing-basement-nyc",
    title: "Waterproofing Your NYC Basement: Interior vs Exterior Methods",
    excerpt:
      "Both systems work, but they solve different problems. Understanding the difference can save you from an expensive misdiagnosis.",
    category: "Waterproofing",
    date: "December 5, 2024",
    readTime: "5 min read",
  },
  {
    slug: "foundation-cracks-dangerous",
    title: "Not All Foundation Cracks Are Equal — Here's How to Tell the Difference",
    excerpt:
      "Hairline shrinkage cracks are normal. Horizontal cracks in block walls are not. Learn what your foundation is telling you.",
    category: "Foundation",
    date: "November 14, 2024",
    readTime: "7 min read",
  },
  {
    slug: "hardscaping-material-comparison",
    title: "Cambridge vs Nicolock vs Unilock: Which Paver is Right for Your Project?",
    excerpt:
      "As certified installers for all three manufacturers, we know these product lines inside and out. Here's an honest comparison.",
    category: "Hardscaping",
    date: "October 3, 2024",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-16 pb-14 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand" />
            <span className="section-label">Insights</span>
          </div>
          <h1 className="font-display font-bold text-display-xl text-black">
            Construction{" "}
            <em className="italic text-brand">Knowledge</em>
            <br />
            Worth Reading.
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <div className="mb-16">
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group grid lg:grid-cols-2 bg-white rounded-lg border border-gray-200 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-brand/10 via-brand/5 to-transparent flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent group-hover:from-brand/15 transition-all duration-500" />
                <div className="relative z-10 text-center px-8">
                  <div className="w-12 h-12 border border-brand/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-brand/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <p className="text-brand text-xs font-mono tracking-widest">FEATURED</p>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-brand tracking-widest mb-4 block">
                  {posts[0].category} · {posts[0].date}
                </span>
                <h2 className="font-display font-bold text-2xl text-black mb-4 group-hover:text-brand transition-colors duration-300">
                  {posts[0].title}
                </h2>
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-6">{posts[0].excerpt}</p>
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
                className="group bg-white border border-gray-200 rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-8 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono text-brand tracking-widest">{post.category}</span>
                  <span className="text-gray-400 text-[10px] font-mono">{post.readTime}</span>
                </div>
                <h3 className="font-display font-semibold text-black text-lg mb-3 group-hover:text-brand transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                <p className="font-body text-gray-600 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-body">{post.date}</span>
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
