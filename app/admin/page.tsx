"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  BookOpen,
  MessageSquare,
  Star,
  Edit3,
  Image,
  TrendingUp,
  Users,
  Eye,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface DashboardStats {
  pages: number;
  blogs: number;
  reviews: number;
  chats: number;
}

const quickActions = [
  {
    title: "Create Page",
    description: "Add a new service or location page",
    href: "/admin/pages?new=true",
    icon: FileText,
    color: "bg-[#0055A5]",
  },
  {
    title: "Write Blog Post",
    description: "Create a new blog article",
    href: "/admin/blogs?new=true",
    icon: BookOpen,
    color: "bg-blue-600",
  },
  {
    title: "Edit Site Pages",
    description: "Update home, about, contact pages",
    href: "/admin/site-pages",
    icon: Edit3,
    color: "bg-green-600",
  },
  {
    title: "View Chats",
    description: "Respond to customer messages",
    href: "/admin/chat",
    icon: MessageSquare,
    color: "bg-[#FBB62E]",
  },
];

const adminSections = [
  {
    title: "Dynamic Pages",
    description: "Create and manage service & location pages",
    href: "/admin/pages",
    icon: FileText,
    stats: "pages",
  },
  {
    title: "Blog Posts",
    description: "Write and publish blog articles",
    href: "/admin/blogs",
    icon: BookOpen,
    stats: "blogs",
  },
  {
    title: "Site Pages",
    description: "Edit static pages like Home, About, Contact",
    href: "/admin/site-pages",
    icon: Edit3,
    stats: null,
  },
  {
    title: "Reviews",
    description: "Manage customer testimonials",
    href: "/admin/reviews",
    icon: Star,
    stats: "reviews",
  },
  {
    title: "Gallery",
    description: "Upload and organize project photos",
    href: "/admin/gallery",
    icon: Image,
    stats: null,
  },
  {
    title: "Live Chat",
    description: "View and respond to customer chats",
    href: "/admin/chat",
    icon: MessageSquare,
    stats: "chats",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pages: 0,
    blogs: 0,
    reviews: 0,
    chats: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Get stats
      try {
        const [pagesRes, blogsRes, reviewsRes, chatsRes] = await Promise.all([
          supabase.from("pages").select("id", { count: "exact", head: true }),
          supabase.from("blogs").select("id", { count: "exact", head: true }),
          supabase.from("reviews").select("id", { count: "exact", head: true }),
          supabase.from("chat_sessions").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          pages: pagesRes.count || 0,
          blogs: blogsRes.count || 0,
          reviews: reviewsRes.count || 0,
          chats: chatsRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/60 mt-1">
          Welcome back{user?.email ? `, ${user.email}` : ""}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Pages", value: stats.pages, icon: FileText, color: "text-[#0055A5]" },
          { label: "Blog Posts", value: stats.blogs, icon: BookOpen, color: "text-blue-400" },
          { label: "Reviews", value: stats.reviews, icon: Star, color: "text-[#FBB62E]" },
          { label: "Active Chats", value: stats.chats, icon: MessageSquare, color: "text-green-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
              ) : (
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              )}
            </div>
            <p className="text-white/60 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white group-hover:text-[#FBB62E] transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-white/60 mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin Sections */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Manage Content</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-[#0055A5]/20 rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-[#0055A5]" />
                </div>
                {section.stats && (
                  <span className="text-sm text-white/40">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      `${stats[section.stats as keyof DashboardStats]} items`
                    )}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white mt-4 group-hover:text-[#FBB62E] transition-colors">
                {section.title}
              </h3>
              <p className="text-sm text-white/60 mt-1">{section.description}</p>
              <div className="flex items-center gap-1 text-[#FBB62E] text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Manage</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-br from-[#0055A5]/20 to-[#FBB62E]/10 border border-white/10 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-2">Pro Tips</h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <span className="text-[#FBB62E]">&bull;</span>
            Create service area pages for each city you serve to boost local SEO rankings
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FBB62E]">&bull;</span>
            Check the Live Chat regularly to respond to customer inquiries about construction projects
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FBB62E]">&bull;</span>
            Keep blog content fresh with at least 2-3 posts per month for better SEO
          </li>
        </ul>
      </div>
    </div>
  );
}
