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
  FileText,
  Eye,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  GripVertical,
  HelpCircle,
  Zap,
  Layout,
  Type,
  List,
  MessageSquare,
  Settings,
  MapPin,
  Wrench,
  Info,
  Monitor,
} from "lucide-react";

type PageType = "service" | "location" | "informational";

interface PageData {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface GeneratedPageData {
  hero: {
    title: string;
    titleHighlight: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: string;
  };
  intro: {
    heading: string;
    content: string;
  };
  services: ServiceItem[];
  benefits: string[];
  process: ProcessStep[];
  faq: FAQItem[];
  cta: {
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    twitterCard?: "summary" | "summary_large_image";
    canonicalUrl?: string;
  };
}

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

// Input Field Component
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  rows,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "url" | "textarea";
  rows?: number;
  hint?: string;
}) {
  const inputClasses =
    "w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent";

  return (
    <div>
      <label className="block text-white/70 text-sm mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {hint && <p className="text-white/40 text-xs mt-1">{hint}</p>}
    </div>
  );
}

function AdminPagesContent() {
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<PageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [editingPage, setEditingPage] = useState<PageData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "draft" as "draft" | "published",
    pageType: "service" as PageType,
    data: {} as GeneratedPageData,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  // AI generation
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiServiceName, setAiServiceName] = useState("");
  const [aiSelectedType, setAiSelectedType] = useState<PageType>("service");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showAiModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showAiModal]);

  useEffect(() => {
    fetchPages();
    if (searchParams.get("new") === "true") {
      startNewPage();
    }
  }, [searchParams]);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pages");
    } finally {
      setIsLoading(false);
    }
  };

  const getEmptyPageData = (): GeneratedPageData => ({
    hero: {
      title: "",
      titleHighlight: "",
      description: "",
      primaryButtonText: "Request an Estimate",
      primaryButtonLink: "/contact",
      backgroundImage: "",
    },
    intro: { heading: "", content: "" },
    services: [],
    benefits: [],
    process: [],
    faq: [],
    cta: { title: "", description: "" },
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ogImage: "",
      twitterCard: "summary_large_image",
      canonicalUrl: "",
    },
  });

  const startNewPage = () => {
    setEditingPage(null);
    setFormData({
      title: "",
      slug: "",
      status: "draft",
      pageType: "service",
      data: getEmptyPageData(),
    });
    setShowPreview(false);
    setShowTypeSelector(true);
  };

  const selectTypeAndEdit = (type: PageType) => {
    setFormData((prev) => ({ ...prev, pageType: type }));
    setShowTypeSelector(false);
    setIsEditing(true);
  };

  const editPage = (page: PageData) => {
    setEditingPage(page);
    const pageData = page.data as unknown as GeneratedPageData & { pageType?: PageType };
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      pageType: pageData?.pageType || "service",
      data: {
        ...getEmptyPageData(),
        ...pageData,
        hero: { ...getEmptyPageData().hero, ...pageData?.hero },
        intro: { ...getEmptyPageData().intro, ...pageData?.intro },
        cta: { ...getEmptyPageData().cta, ...pageData?.cta },
        seo: { ...getEmptyPageData().seo, ...pageData?.seo },
      },
    });
    setShowPreview(false);
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
      slug: editingPage ? formData.slug : slugify(title),
    });
  };

  const updateData = (updates: Partial<GeneratedPageData>) => {
    setFormData({
      ...formData,
      data: { ...formData.data, ...updates },
    });
  };

  const updateHero = (field: string, value: string) => {
    updateData({
      hero: { ...formData.data.hero, [field]: value },
    });
  };

  const updateIntro = (field: string, value: string) => {
    updateData({
      intro: { ...formData.data.intro, [field]: value },
    });
  };

  const updateCta = (field: string, value: string) => {
    updateData({
      cta: { ...formData.data.cta, [field]: value },
    });
  };

  const updateSeo = (field: string, value: string | string[]) => {
    updateData({
      seo: { ...formData.data.seo, [field]: value },
    });
  };

  // Service helpers
  const addService = () => {
    updateData({
      services: [
        ...(formData.data.services || []),
        { title: "", description: "", icon: "Wrench" },
      ],
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const services = [...(formData.data.services || [])];
    services[index] = { ...services[index], [field]: value };
    updateData({ services });
  };

  const removeService = (index: number) => {
    const services = [...(formData.data.services || [])];
    services.splice(index, 1);
    updateData({ services });
  };

  // Benefits helpers
  const addBenefit = () => {
    updateData({
      benefits: [...(formData.data.benefits || []), ""],
    });
  };

  const updateBenefit = (index: number, value: string) => {
    const benefits = [...(formData.data.benefits || [])];
    benefits[index] = value;
    updateData({ benefits });
  };

  const removeBenefit = (index: number) => {
    const benefits = [...(formData.data.benefits || [])];
    benefits.splice(index, 1);
    updateData({ benefits });
  };

  // Process helpers
  const addProcess = () => {
    const currentProcess = formData.data.process || [];
    updateData({
      process: [
        ...currentProcess,
        { step: currentProcess.length + 1, title: "", description: "" },
      ],
    });
  };

  const updateProcess = (index: number, field: string, value: string | number) => {
    const process = [...(formData.data.process || [])];
    process[index] = { ...process[index], [field]: value };
    updateData({ process });
  };

  const removeProcess = (index: number) => {
    const process = [...(formData.data.process || [])];
    process.splice(index, 1);
    process.forEach((p, i) => (p.step = i + 1));
    updateData({ process });
  };

  // FAQ helpers
  const addFaq = () => {
    updateData({
      faq: [...(formData.data.faq || []), { question: "", answer: "" }],
    });
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const faq = [...(formData.data.faq || [])];
    faq[index] = { ...faq[index], [field]: value };
    updateData({ faq });
  };

  const removeFaq = (index: number) => {
    const faq = [...(formData.data.faq || [])];
    faq.splice(index, 1);
    updateData({ faq });
  };

  const savePage = async () => {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const method = editingPage ? "PUT" : "POST";
      const dataWithPageType = {
        ...formData.data,
        pageType: formData.pageType,
      };
      const body = editingPage
        ? { id: editingPage.id, ...formData, data: dataWithPageType }
        : { ...formData, data: dataWithPageType };

      const res = await fetch("/api/admin/pages", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess(
        editingPage ? "Page updated successfully" : "Page created successfully"
      );
      setIsEditing(false);
      fetchPages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page");
    } finally {
      setIsSaving(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const res = await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess("Page deleted successfully");
      fetchPages();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete page");
    }
  };

  const generateWithAI = async () => {
    if (!aiServiceName.trim()) return;

    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/admin/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName: aiServiceName }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setFormData({
        title: aiServiceName,
        slug: slugify(aiServiceName),
        status: "draft",
        pageType: aiSelectedType,
        data: { ...getEmptyPageData(), ...data },
      });

      setShowAiModal(false);
      setAiServiceName("");
      setShowPreview(false);
      setIsEditing(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate page");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PAGE_TYPES: { type: PageType; name: string; description: string; icon: React.ElementType; details: string[] }[] = [
    {
      type: "service",
      name: "Service Page",
      description: "Showcase a construction service with detailed sections",
      icon: Wrench,
      details: ["Hero section", "Introduction", "Service cards", "Benefits", "Process steps", "FAQ", "CTA"],
    },
    {
      type: "location",
      name: "Location Page",
      description: "Target a specific area or neighborhood",
      icon: MapPin,
      details: ["Hero section", "Local intro", "Area services", "Benefits", "Process steps", "FAQ", "CTA"],
    },
    {
      type: "informational",
      name: "Informational Page",
      description: "General content and information pages",
      icon: Info,
      details: ["Hero section", "Content intro", "Key points", "Benefits", "FAQ", "CTA"],
    },
  ];

  // ============ TYPE SELECTOR VIEW ============
  if (showTypeSelector) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Page</h1>
          <p className="text-white/60 text-lg">Choose a page type to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PAGE_TYPES.map(({ type, name, description, icon: Icon, details }) => (
            <button
              key={type}
              onClick={() => selectTypeAndEdit(type)}
              className="group text-left bg-white/5 border-2 border-white/10 rounded-2xl p-6 hover:border-accent hover:bg-accent/5 transition-all duration-200"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-white/50 text-sm mb-4">{description}</p>
              <div className="space-y-1.5">
                {details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/40 text-xs">
                    <div className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
                    {detail}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowTypeSelector(false)}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ============ EDITING VIEW ============
  if (isEditing) {
    return (
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {editingPage ? "Edit Page" : "Create New Page"}
            </h1>
            <p className="text-white/60 mt-1">
              {editingPage
                ? "Update all page content and settings"
                : "Add a new dynamic page"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 ${
                showPreview
                  ? "bg-accent text-gray-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Monitor className="w-4 h-4" />
              {showPreview ? "Hide Preview" : "Preview"}
            </button>
            <button
              onClick={() => setShowAiModal(true)}
              className="bg-brand hover:bg-brand-dark text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {Object.keys(formData.data.hero || {}).some(
                (k) => formData.data.hero?.[k as keyof typeof formData.data.hero]
              )
                ? "Regenerate"
                : "Generate"}{" "}
              with AI
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

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Preview Header Bar */}
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-md px-4 py-1 text-sm text-gray-500 border">
                  bonardiconstruction.com/{formData.slug || "page-url"}
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="max-h-[500px] overflow-y-auto">
              {/* Hero Preview */}
              <div
                className="relative py-20 px-8 bg-cover bg-center"
                style={{
                  backgroundImage: formData.data.hero?.backgroundImage
                    ? `url(${formData.data.hero.backgroundImage})`
                    : 'linear-gradient(135deg, #002244 0%, #0055A5 100%)'
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 max-w-3xl">
                  <span className="inline-flex items-center gap-1 text-xs text-accent mb-4 px-3 py-1 bg-accent/10 rounded-full">
                    {formData.pageType === "service" && <><Wrench className="w-3 h-3" /> Service Page</>}
                    {formData.pageType === "location" && <><MapPin className="w-3 h-3" /> Location Page</>}
                    {formData.pageType === "informational" && <><Info className="w-3 h-3" /> Info Page</>}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {formData.data.hero?.title || "Page Title"}{" "}
                    <span className="text-accent">{formData.data.hero?.titleHighlight}</span>
                  </h1>
                  <p className="text-gray-200 text-lg mb-6 line-clamp-3">
                    {formData.data.hero?.description || "Page description will appear here..."}
                  </p>
                  <div className="flex gap-3">
                    <span className="bg-accent text-gray-900 px-6 py-2 rounded-lg font-medium text-sm">
                      {formData.data.hero?.primaryButtonText || "Request an Estimate"}
                    </span>
                    {formData.data.hero?.secondaryButtonText && (
                      <span className="bg-white/20 text-white px-6 py-2 rounded-lg font-medium text-sm">
                        {formData.data.hero.secondaryButtonText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Intro Preview */}
              {(formData.data.intro?.heading || formData.data.intro?.content) && (
                <div className="py-12 px-8 bg-gray-50">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {formData.data.intro?.heading || "Introduction"}
                  </h2>
                  <p className="text-gray-600 line-clamp-4">
                    {formData.data.intro?.content || "Introduction content..."}
                  </p>
                </div>
              )}

              {/* Services Preview */}
              {formData.data.services && formData.data.services.length > 0 && (
                <div className="py-12 px-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Our Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.data.services.slice(0, 6).map((service, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4">
                        <div className="w-8 h-8 bg-blue-100 text-brand rounded-lg flex items-center justify-center mb-2">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{service.title || `Service ${i + 1}`}</h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Preview */}
              {formData.data.benefits && formData.data.benefits.length > 0 && (
                <div className="py-12 px-8 bg-brand-900">
                  <h3 className="text-xl font-bold text-white mb-4">Why Choose Us</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.data.benefits.slice(0, 6).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-blue-100 text-sm">
                        <div className="w-5 h-5 bg-accent text-gray-900 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                          ✓
                        </div>
                        <span className="line-clamp-1">{benefit || `Benefit ${i + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Preview */}
              {(formData.data.cta?.title || formData.data.cta?.description) && (
                <div className="py-12 px-8 bg-accent-50 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {formData.data.cta?.title || "Ready to Get Started?"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {formData.data.cta?.description || "Contact us today..."}
                  </p>
                  <span className="inline-block bg-brand text-white px-6 py-2 rounded-lg font-medium text-sm">
                    {formData.data.cta?.buttonText || "Contact Us"}
                  </span>
                </div>
              )}

              {/* FAQ Preview */}
              {formData.data.faq && formData.data.faq.length > 0 && (
                <div className="py-12 px-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {formData.data.faq.slice(0, 4).map((item, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 text-sm">{item.question || `Question ${i + 1}`}</h4>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h3 className="font-medium text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            Page Settings
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Field
              label="Page Title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g., Masonry Services"
            />
            <div>
              <label className="block text-white/70 text-sm mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                <span className="text-white/40 px-3">/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: slugify(e.target.value) })
                  }
                  className="flex-1 bg-transparent py-2 pr-3 text-white text-sm placeholder-white/40 focus:outline-none"
                  placeholder="masonry-services"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "draft" | "published",
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Page Type Selection */}
          <div className="mt-4">
            <label className="block text-white/70 text-sm mb-2">
              Page Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pageType: "service" })}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  formData.pageType === "service"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <Wrench className="w-6 h-6" />
                <span className="text-sm font-medium">Service</span>
                <span className="text-xs opacity-70 text-center">For construction services</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pageType: "location" })}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  formData.pageType === "location"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <MapPin className="w-6 h-6" />
                <span className="text-sm font-medium">Location</span>
                <span className="text-xs opacity-70 text-center">Area-specific pages</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pageType: "informational" })}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  formData.pageType === "informational"
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/20 bg-white/5 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                <Info className="w-6 h-6" />
                <span className="text-sm font-medium">Informational</span>
                <span className="text-xs opacity-70 text-center">General info pages</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Section title="Hero Section" icon={Layout} defaultOpen={true}>
          <div className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Main Title"
                value={formData.data.hero?.title || ""}
                onChange={(v) => updateHero("title", v)}
                placeholder="Professional Masonry Services"
              />
              <Field
                label="Highlighted Text"
                value={formData.data.hero?.titleHighlight || ""}
                onChange={(v) => updateHero("titleHighlight", v)}
                placeholder="in Queens & NYC"
                hint="This text appears in the accent color"
              />
            </div>
            <Field
              label="Description"
              value={formData.data.hero?.description || ""}
              onChange={(v) => updateHero("description", v)}
              placeholder="Describe your service..."
              type="textarea"
              rows={3}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Primary Button Text"
                value={formData.data.hero?.primaryButtonText || ""}
                onChange={(v) => updateHero("primaryButtonText", v)}
                placeholder="Request an Estimate"
              />
              <Field
                label="Primary Button Link"
                value={formData.data.hero?.primaryButtonLink || ""}
                onChange={(v) => updateHero("primaryButtonLink", v)}
                placeholder="/contact"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Secondary Button Text (optional)"
                value={formData.data.hero?.secondaryButtonText || ""}
                onChange={(v) => updateHero("secondaryButtonText", v)}
                placeholder="Call Now"
              />
              <Field
                label="Secondary Button Link"
                value={formData.data.hero?.secondaryButtonLink || ""}
                onChange={(v) => updateHero("secondaryButtonLink", v)}
                placeholder="tel:+17187623400"
              />
            </div>
            <Field
              label="Background Image URL"
              value={formData.data.hero?.backgroundImage || ""}
              onChange={(v) => updateHero("backgroundImage", v)}
              placeholder="https://images.unsplash.com/..."
              type="url"
              hint="Recommended size: 1920x1080 or larger"
            />
            {formData.data.hero?.backgroundImage && (
              <div className="aspect-video max-w-md rounded-lg overflow-hidden bg-white/10">
                <img
                  src={formData.data.hero.backgroundImage}
                  alt="Hero background preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </Section>

        {/* Intro Section */}
        <Section title="Introduction Section" icon={Type}>
          <div className="space-y-4 pt-4">
            <Field
              label="Section Heading"
              value={formData.data.intro?.heading || ""}
              onChange={(v) => updateIntro("heading", v)}
              placeholder="Why Choose Our Service"
            />
            <Field
              label="Content"
              value={formData.data.intro?.content || ""}
              onChange={(v) => updateIntro("content", v)}
              placeholder="Write a compelling introduction..."
              type="textarea"
              rows={4}
            />
          </div>
        </Section>

        {/* Services Section */}
        <Section title={`Services (${formData.data.services?.length || 0})`} icon={List}>
          <div className="space-y-4 pt-4">
            {(formData.data.services || []).map((service, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60">
                    <GripVertical className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Service {index + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <Field
                    label="Title"
                    value={service.title}
                    onChange={(v) => updateService(index, "title", v)}
                    placeholder="Service name"
                  />
                  <Field
                    label="Icon Name"
                    value={service.icon}
                    onChange={(v) => updateService(index, "icon", v)}
                    placeholder="Wrench, Home, Shield..."
                    hint="Lucide icon name"
                  />
                </div>
                <Field
                  label="Description"
                  value={service.description}
                  onChange={(v) => updateService(index, "description", v)}
                  placeholder="Describe this service..."
                  type="textarea"
                  rows={2}
                />
                <Field
                  label="Image URL (optional)"
                  value={service.image || ""}
                  onChange={(v) => updateService(index, "image", v)}
                  placeholder="https://..."
                  type="url"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </button>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section title={`Benefits (${formData.data.benefits?.length || 0})`} icon={Zap}>
          <div className="space-y-3 pt-4">
            {(formData.data.benefits || []).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder={`Benefit ${index + 1}`}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="p-2 text-red-400/60 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Benefit
            </button>
          </div>
        </Section>

        {/* Process Section */}
        <Section title={`Process Steps (${formData.data.process?.length || 0})`} icon={List}>
          <div className="space-y-4 pt-4">
            {(formData.data.process || []).map((step, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-4 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-accent text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </span>
                    <span className="text-white/60 text-sm">Step {step.step}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProcess(index)}
                    className="text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Field
                  label="Step Title"
                  value={step.title}
                  onChange={(v) => updateProcess(index, "title", v)}
                  placeholder="e.g., Initial Consultation"
                />
                <Field
                  label="Step Description"
                  value={step.description}
                  onChange={(v) => updateProcess(index, "description", v)}
                  placeholder="Describe this step..."
                  type="textarea"
                  rows={2}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addProcess}
              className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section title={`FAQ (${formData.data.faq?.length || 0})`} icon={HelpCircle}>
          <div className="space-y-4 pt-4">
            {(formData.data.faq || []).map((item, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-4 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">FAQ {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Field
                  label="Question"
                  value={item.question}
                  onChange={(v) => updateFaq(index, "question", v)}
                  placeholder="What is the question?"
                />
                <Field
                  label="Answer"
                  value={item.answer}
                  onChange={(v) => updateFaq(index, "answer", v)}
                  placeholder="Provide a helpful answer..."
                  type="textarea"
                  rows={3}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>
        </Section>

        {/* CTA Section */}
        <Section title="Call to Action Section" icon={MessageSquare}>
          <div className="space-y-4 pt-4">
            <Field
              label="CTA Title"
              value={formData.data.cta?.title || ""}
              onChange={(v) => updateCta("title", v)}
              placeholder="Ready to Get Started?"
            />
            <Field
              label="CTA Description"
              value={formData.data.cta?.description || ""}
              onChange={(v) => updateCta("description", v)}
              placeholder="Contact us today for an estimate..."
              type="textarea"
              rows={2}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Button Text"
                value={formData.data.cta?.buttonText || ""}
                onChange={(v) => updateCta("buttonText", v)}
                placeholder="Contact Us Today"
              />
              <Field
                label="Button Link"
                value={formData.data.cta?.buttonLink || ""}
                onChange={(v) => updateCta("buttonLink", v)}
                placeholder="/contact"
              />
            </div>
          </div>
        </Section>

        {/* SEO Section */}
        <Section title="SEO & Social Media" icon={ImageIcon}>
          <div className="space-y-4 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Meta Title"
                value={formData.data.seo?.metaTitle || ""}
                onChange={(v) => updateSeo("metaTitle", v)}
                placeholder="Page title for search engines"
                hint="50-60 characters recommended"
              />
              <Field
                label="Canonical URL"
                value={formData.data.seo?.canonicalUrl || ""}
                onChange={(v) => updateSeo("canonicalUrl", v)}
                placeholder="Leave empty for default"
                type="url"
              />
            </div>
            <Field
              label="Meta Description"
              value={formData.data.seo?.metaDescription || ""}
              onChange={(v) => updateSeo("metaDescription", v)}
              placeholder="Brief description for search results..."
              type="textarea"
              rows={2}
              hint="150-160 characters recommended"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="OG/Social Image URL"
                value={formData.data.seo?.ogImage || ""}
                onChange={(v) => updateSeo("ogImage", v)}
                placeholder="https://..."
                type="url"
                hint="1200x630 recommended"
              />
              <div>
                <label className="block text-white/70 text-sm mb-1.5">
                  Twitter Card Type
                </label>
                <select
                  value={formData.data.seo?.twitterCard || "summary_large_image"}
                  onChange={(e) => updateSeo("twitterCard", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent"
                >
                  <option value="summary_large_image">Large Image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
            </div>
            <Field
              label="Keywords"
              value={formData.data.seo?.keywords?.join(", ") || ""}
              onChange={(v) =>
                updateSeo(
                  "keywords",
                  v
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean)
                )
              }
              placeholder="construction, masonry, queens contractor"
              hint="Comma-separated keywords"
            />
            {formData.data.seo?.ogImage && (
              <div className="aspect-video max-w-sm rounded-lg overflow-hidden bg-white/10">
                <img
                  src={formData.data.seo.ogImage}
                  alt="OG image preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </Section>

        {/* Spacer for fixed footer */}
        <div className="h-20" />

        {/* Save Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 border-t border-white/10 bg-gray-900/95 backdrop-blur-sm z-40">
          <div className="max-w-5xl flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={savePage}
              disabled={isSaving || !formData.title || !formData.slug}
              className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-6 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Page"}
            </button>
          </div>
        </div>

        {/* AI Modal */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Generate Page with AI
              </h3>
              <p className="text-white/60 mb-4">
                Choose a page type and enter a topic. AI will generate complete
                page content that you can then edit.
              </p>

              {/* Page Type Selection in AI Modal */}
              <label className="block text-white/70 text-sm mb-2">Page Type</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {PAGE_TYPES.map(({ type, name, icon: TypeIcon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAiSelectedType(type)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center ${
                      aiSelectedType === type
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
                    }`}
                  >
                    <TypeIcon className="w-5 h-5" />
                    <span className="text-xs font-medium">{name}</span>
                  </button>
                ))}
              </div>

              <label className="block text-white/70 text-sm mb-2">Service / Topic Name</label>
              <input
                type="text"
                value={aiServiceName}
                onChange={(e) => setAiServiceName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent mb-4"
                placeholder="e.g., Masonry Restoration, Concrete Work"
                onKeyDown={(e) => e.key === "Enter" && generateWithAI()}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateWithAI}
                  disabled={isGenerating || !aiServiceName.trim()}
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

  // ============ LIST VIEW ============
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Pages</h1>
          <p className="text-white/60 mt-1">
            Manage dynamic service and location pages
          </p>
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
            onClick={startNewPage}
            className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Page
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
          placeholder="Search pages..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
        />
      </div>

      {/* Pages List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No pages yet</h3>
          <p className="text-white/60 mb-4">
            Create your first page to get started
          </p>
          <button
            onClick={startNewPage}
            className="bg-accent hover:bg-accent-dark text-gray-900 font-medium px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Page
          </button>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  Title
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4 hidden md:table-cell">
                  Slug
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  Status
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4 hidden lg:table-cell">
                  Updated
                </th>
                <th className="text-right text-white/60 font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{page.title}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-white/60">/{page.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        page.status === "published"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="text-white/60 text-sm">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {page.status === "draft" ? (
                        <a
                          href={`/${page.slug}?preview=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-brand hover:text-brand-dark transition-colors"
                          title="Preview draft"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-white/60 hover:text-white transition-colors"
                          title="View page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => editPage(page)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                        title="Edit page"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="p-2 text-white/60 hover:text-red-400 transition-colors"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Generate Page with AI
            </h3>
            <p className="text-white/60 mb-4">
              Choose a page type and enter a topic. AI will generate complete page
              content.
            </p>

            {/* Page Type Selection in AI Modal */}
            <label className="block text-white/70 text-sm mb-2">Page Type</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PAGE_TYPES.map(({ type, name, icon: TypeIcon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAiSelectedType(type)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center ${
                    aiSelectedType === type
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
                  }`}
                >
                  <TypeIcon className="w-5 h-5" />
                  <span className="text-xs font-medium">{name}</span>
                </button>
              ))}
            </div>

            <label className="block text-white/70 text-sm mb-2">Service / Topic Name</label>
            <input
              type="text"
              value={aiServiceName}
              onChange={(e) => setAiServiceName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent mb-4"
              placeholder="e.g., Masonry Restoration, Concrete Work"
              onKeyDown={(e) => e.key === "Enter" && generateWithAI()}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={generateWithAI}
                disabled={isGenerating || !aiServiceName.trim()}
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

export default function AdminPagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      }
    >
      <AdminPagesContent />
    </Suspense>
  );
}
