"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Sparkles,
  Save,
  X,
  ExternalLink,
  Search,
  BookOpen,
  Image,
  Eye,
  ChevronDown,
  ChevronUp,
  FileText,
  Settings,
  Tag,
  User,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { posts as blogDataPosts } from "@/lib/blog-data";

// Collapsible Section Component
function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-accent" />
          <span className="font-medium text-white">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-white/10">{children}</div>
      )}
    </div>
  );
}

interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    twitterCard?: 'summary' | 'summary_large_image';
    canonicalUrl?: string;
  };
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const categories = [
  "Construction Tips",
  "Masonry & Concrete",
  "Home Improvement",
  "Seasonal Advice",
  "Industry News",
];

function AdminBlogsContent() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "Bonardi Construction",
    category: "Construction Tips",
    tags: [] as string[],
    status: "draft" as "draft" | "published",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [] as string[],
      ogImage: "",
      twitterCard: "summary_large_image" as 'summary' | 'summary_large_image',
      canonicalUrl: "",
    },
  });
  const [tagInput, setTagInput] = useState("");

  // AI generation
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");

  useEffect(() => {
    fetchBlogs();
    if (searchParams.get("new") === "true") {
      startNewBlog();
    }
  }, [searchParams]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // If API returns empty array, load initial data from blog-data.ts
      if (Array.isArray(data) && data.length === 0 && blogDataPosts.length > 0) {
        const initialBlogs: BlogData[] = blogDataPosts.map((post, index) => ({
          id: `blog-${index + 1}`,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featured_image: post.image,
          author: "Bonardi Construction",
          category: post.category,
          tags: [],
          status: "published" as const,
          seo: {
            metaTitle: post.title,
            metaDescription: post.excerpt,
            keywords: [],
            ogImage: post.image,
            twitterCard: "summary_large_image" as const,
            canonicalUrl: "",
          },
          published_at: post.date,
          created_at: post.date,
          updated_at: post.date,
        }));
        setBlogs(initialBlogs);
      } else {
        setBlogs(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const startNewBlog = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      author: "Bonardi Construction",
      category: "Construction Tips",
      tags: [],
      status: "draft",
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
        ogImage: "",
        twitterCard: "summary_large_image",
        canonicalUrl: "",
      },
    });
    setIsEditing(true);
  };

  const editBlog = (blog: BlogData) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featured_image: blog.featured_image || "",
      author: blog.author || "Bonardi Construction",
      category: blog.category || "Construction Tips",
      tags: blog.tags || [],
      status: blog.status,
      seo: {
        metaTitle: blog.seo?.metaTitle || "",
        metaDescription: blog.seo?.metaDescription || "",
        keywords: blog.seo?.keywords || [],
        ogImage: blog.seo?.ogImage || "",
        twitterCard: blog.seo?.twitterCard || "summary_large_image",
        canonicalUrl: blog.seo?.canonicalUrl || "",
      },
    });
    setIsEditing(true);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: editingBlog ? formData.slug : slugify(title),
      seo: {
        ...formData.seo,
        metaTitle: formData.seo.metaTitle || title,
      },
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const saveBlog = async () => {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const method = editingBlog ? "PUT" : "POST";
      const body = editingBlog
        ? { id: editingBlog.id, ...formData }
        : formData;

      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess(editingBlog ? "Blog updated successfully" : "Blog created successfully");
      setIsEditing(false);
      fetchBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess("Blog deleted successfully");
      // Remove from local state
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog");
    }
  };

  const generateWithAI = async () => {
    if (!aiTopic.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          keywords: aiKeywords.split(",").map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setFormData({
        title: data.title,
        slug: data.slug || slugify(data.title),
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        author: "Bonardi Construction",
        category: data.category || "Construction Tips",
        tags: data.tags || [],
        status: "draft",
        seo: data.seo || {
          metaTitle: data.title,
          metaDescription: data.excerpt,
          keywords: [],
          ogImage: "",
          twitterCard: "summary_large_image",
          canonicalUrl: "",
        },
      });

      setShowAiModal(false);
      setAiTopic("");
      setAiKeywords("");
      setIsEditing(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate blog");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State for content preview
  const [showPreview, setShowPreview] = useState(false);

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-white/60 mt-1">
              {editingBlog ? "Update all blog content and settings" : "Write a new blog article"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAiModal(true)}
              className="bg-brand hover:bg-brand-dark text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {formData.content ? "Regenerate" : "Generate"} with AI
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}

        {/* Basic Settings */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="font-medium text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            Post Settings
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-white/70 text-sm mb-1.5">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Blog post title"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">URL Slug</label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                <span className="text-white/40 px-3 text-sm">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  className="flex-1 bg-transparent py-2 pr-3 text-white text-sm placeholder-white/40 focus:outline-none"
                  placeholder="url-slug"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Featured Image URL</label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="https://..."
              />
            </div>
          </div>
          {formData.featured_image && (
            <div className="aspect-video max-w-sm rounded-lg overflow-hidden bg-white/10">
              <img
                src={formData.featured_image}
                alt="Featured"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <Section title="Excerpt / Summary" icon={FileText} defaultOpen={true}>
          <div className="pt-4">
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none"
              placeholder="Brief summary of the blog post (shown in blog listings and search results)"
            />
            <p className="text-white/40 text-xs mt-1">This appears in blog cards and search results</p>
          </div>
        </Section>

        {/* Content */}
        <Section title="Content" icon={FileText} defaultOpen={true}>
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-white/60 text-sm">Use the toolbar to format your content</p>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-accent hover:text-accent-dark text-sm inline-flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Start writing your blog post..."
            />
            {showPreview && formData.content && (
              <div className="bg-white rounded-lg p-6">
                <p className="text-gray-500 text-xs mb-4">Content Preview:</p>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            )}
          </div>
        </Section>

        {/* Tags */}
        <Section title={`Tags (${formData.tags.length})`} icon={Tag}>
          <div className="pt-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Type a tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-white/80 px-3 py-1.5 rounded-lg text-sm inline-flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {formData.tags.length === 0 && (
                <p className="text-white/40 text-sm">No tags added yet</p>
              )}
            </div>
          </div>
        </Section>

        {/* SEO */}
        <Section title="SEO & Social Media" icon={Image}>
          <div className="pt-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value },
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                  placeholder="SEO title (50-60 characters)"
                />
                <p className="text-white/40 text-xs mt-1">{formData.seo.metaTitle.length}/60 characters</p>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Canonical URL</label>
                <input
                  type="text"
                  value={formData.seo.canonicalUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, canonicalUrl: e.target.value },
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                  placeholder="Leave empty for default URL"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Meta Description</label>
              <textarea
                value={formData.seo.metaDescription}
                onChange={(e) => setFormData({
                  ...formData,
                  seo: { ...formData.seo, metaDescription: e.target.value },
                })}
                rows={2}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm resize-none"
                placeholder="Brief description for search results..."
              />
              <p className="text-white/40 text-xs mt-1">{formData.seo.metaDescription.length}/160 characters recommended</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-1.5">OG/Social Image URL</label>
                <input
                  type="text"
                  value={formData.seo.ogImage}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, ogImage: e.target.value },
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                  placeholder="1200x630 image for social sharing"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1.5">Twitter Card Type</label>
                <select
                  value={formData.seo.twitterCard}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, twitterCard: e.target.value as 'summary' | 'summary_large_image' },
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent text-sm"
                >
                  <option value="summary_large_image">Large Image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">Keywords</label>
              <input
                type="text"
                value={formData.seo.keywords?.join(", ") || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  seo: {
                    ...formData.seo,
                    keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                  },
                })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                placeholder="Comma-separated keywords for SEO"
              />
            </div>
            {formData.seo.ogImage && (
              <div className="aspect-video max-w-sm rounded-lg overflow-hidden bg-white/10">
                <img
                  src={formData.seo.ogImage}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
          </div>
        </Section>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-gray-900/95 backdrop-blur-sm py-4 -mx-4 px-4 border-t border-white/10">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveBlog}
            disabled={isSaving || !formData.title || !formData.slug}
            className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Blog Post"}
          </button>
        </div>

        {/* AI Modal */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Generate Blog with AI</h3>
              <p className="text-white/60 mb-4">
                Enter a topic and optional keywords to generate a blog post.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                  placeholder="Blog topic, e.g., 'Masonry Maintenance Tips for NYC Homeowners'"
                />
                <input
                  type="text"
                  value={aiKeywords}
                  onChange={(e) => setAiKeywords(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                  placeholder="Optional keywords (comma separated)"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateWithAI}
                  disabled={isGenerating || !aiTopic.trim()}
                  className="bg-brand hover:bg-brand-dark text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/60 mt-1">Manage your blog content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAiModal(true)}
            className="bg-brand hover:bg-brand-dark text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Generate
          </button>
          <button
            onClick={startNewBlog}
            className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-200">
          {success}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
        />
      </div>

      {/* Blogs List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No blog posts yet</h3>
          <p className="text-white/60 mb-4">Create your first blog post to get started</p>
          <button
            onClick={startNewBlog}
            className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Post
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              {blog.featured_image ? (
                <div className="aspect-video bg-white/10">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-white/5 flex items-center justify-center">
                  <Image className="w-12 h-12 text-white/20" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-accent">{blog.category}</span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-white/60 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">
                    {new Date(blog.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    {blog.status === "draft" ? (
                      <a
                        href={`/blog/${blog.slug}?preview=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-brand hover:text-brand-dark transition-colors"
                        title="Preview draft"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    ) : (
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white/60 hover:text-white transition-colors"
                        title="View post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => editBlog(blog)}
                      className="p-2 text-white/60 hover:text-white transition-colors"
                      title="Edit post"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 text-white/60 hover:text-red-400 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Generate Blog with AI</h3>
            <p className="text-white/60 mb-4">
              Enter a topic and optional keywords to generate a blog post.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Blog topic, e.g., 'Masonry Maintenance Tips for NYC Homeowners'"
                onKeyDown={(e) => e.key === "Enter" && generateWithAI()}
              />
              <input
                type="text"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Optional keywords (comma separated)"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={generateWithAI}
                disabled={isGenerating || !aiTopic.trim()}
                className="bg-brand hover:bg-brand-dark text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>}>
      <AdminBlogsContent />
    </Suspense>
  );
}
