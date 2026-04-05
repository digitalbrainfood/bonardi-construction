"use client";

import { useState } from "react";
import {
  Home,
  Info,
  Phone,
  Image,
  BookOpen,
  MapPin,
  ExternalLink,
  Loader2,
  Save,
  X,
  ChevronRight,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

interface StaticPage {
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  sections: string[];
  seo: { title: string; description: string };
}

const staticPages: StaticPage[] = [
  {
    slug: "about",
    name: "About",
    description: "Company history, team, values, and 60+ years of experience",
    icon: Info,
    path: "/about",
    sections: ["hero", "story", "values", "certifications", "cta"],
    seo: {
      title: "About Bonardi Construction | 60+ Years of Excellence",
      description:
        "Learn about Bonardi Construction's 60+ years of excellence in construction, roofing, paving, and restoration across NYC and Long Island.",
    },
  },
  {
    slug: "contact",
    name: "Contact",
    description: "Contact form, phone, email, service areas",
    icon: Phone,
    path: "/contact",
    sections: ["hero", "contactInfo", "serviceAreas"],
    seo: {
      title: "Contact Bonardi Construction | Free Estimates",
      description:
        "Contact Bonardi Construction for free estimates on construction, roofing, paving, and restoration. Serving NYC, Nassau & Suffolk County.",
    },
  },
  {
    slug: "gallery",
    name: "Gallery",
    description: "Project photos organized by category",
    icon: Image,
    path: "/gallery",
    sections: ["hero", "cta"],
    seo: {
      title: "Project Gallery | Bonardi Construction",
      description:
        "View our portfolio of completed projects including asphalt, concrete, roofing, masonry, and new construction across New York.",
    },
  },
  {
    slug: "blog",
    name: "Blog",
    description: "Blog listing page settings",
    icon: BookOpen,
    path: "/blog",
    sections: ["hero"],
    seo: {
      title: "Blog | Bonardi Construction",
      description:
        "Expert tips, guides, and industry insights from Bonardi Construction.",
    },
  },
  {
    slug: "areas-we-serve",
    name: "Areas We Serve",
    description: "Service areas overview: NYC, Nassau, Suffolk County",
    icon: MapPin,
    path: "/areas-we-serve",
    sections: ["hero", "serviceAreas", "cta"],
    seo: {
      title: "Areas We Serve | Bonardi Construction",
      description:
        "Bonardi Construction serves Queens, Brooklyn, Bronx, Manhattan, Nassau County, and Suffolk County with full construction services.",
    },
  },
  {
    slug: "gary-m-bonelli",
    name: "Gary M. Bonelli",
    description: "Owner profile, biography, and leadership story",
    icon: User,
    path: "/about/gary-m-bonelli",
    sections: ["hero", "story", "cta"],
    seo: {
      title: "Gary M. Bonelli | Owner of Bonardi Construction",
      description:
        "Meet Gary M. Bonelli, the owner of Bonardi Construction, with decades of experience leading construction projects across New York.",
    },
  },
];

interface PageContent {
  [key: string]: unknown;
}

interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

interface ValueItem {
  title: string;
  description: string;
  icon?: string;
}

// Collapsible Section Component
function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
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
        <h3 className="text-lg font-semibold text-white capitalize">
          {title.replace(/([A-Z])/g, " $1").trim()} Section
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 pt-2 border-t border-white/10">{children}</div>
      )}
    </div>
  );
}

// Reviews Repeater Component
function ReviewsEditor({
  reviews,
  onChange,
}: {
  reviews: ReviewItem[];
  onChange: (reviews: ReviewItem[]) => void;
}) {
  const addReview = () => {
    onChange([
      ...reviews,
      {
        name: "",
        location: "",
        rating: 5,
        text: "",
        service: "General Construction",
      },
    ]);
  };

  const updateReview = (
    index: number,
    field: keyof ReviewItem,
    value: string | number
  ) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeReview = (index: number) => {
    onChange(reviews.filter((_, i) => i !== index));
  };

  const serviceOptions = [
    "Asphalt Paving",
    "Concrete",
    "Roofing",
    "Masonry",
    "New Construction",
    "Hardscaping",
    "Restoration",
    "General Construction",
  ];

  return (
    <div className="space-y-4">
      <p className="text-white/60 text-sm">
        Add customer reviews that will be displayed on this page.
      </p>

      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/60">
              <GripVertical className="w-4 h-4" />
              <span className="text-sm font-medium">
                Review #{index + 1}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeReview(index)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 text-xs mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={review.name}
                onChange={(e) => updateReview(index, "name", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-white/70 text-xs mb-1">
                Location
              </label>
              <input
                type="text"
                value={review.location}
                onChange={(e) =>
                  updateReview(index, "location", e.target.value)
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Queens, NY"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 text-xs mb-1">
                Rating (1-5)
              </label>
              <select
                value={review.rating}
                onChange={(e) =>
                  updateReview(index, "rating", parseInt(e.target.value))
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent [&>option]:bg-gray-900"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-xs mb-1">
                Service Type
              </label>
              <select
                value={review.service}
                onChange={(e) =>
                  updateReview(index, "service", e.target.value)
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent [&>option]:bg-gray-900"
              >
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-xs mb-1">
              Review Text
            </label>
            <textarea
              value={review.text}
              onChange={(e) => updateReview(index, "text", e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent resize-none"
              placeholder="Write the customer's review here..."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addReview}
        className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg p-3 text-white/60 hover:text-white hover:border-white/40 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Review
      </button>
    </div>
  );
}

// Services/Benefits Repeater Component
function ItemsEditor({
  items,
  onChange,
  itemLabel = "Item",
  addLabel = "Add Item",
  showIcon = false,
}: {
  items: ServiceItem[] | ValueItem[];
  onChange: (items: ServiceItem[] | ValueItem[]) => void;
  itemLabel?: string;
  addLabel?: string;
  showIcon?: boolean;
}) {
  const addItem = () => {
    onChange([...items, { title: "", description: "", icon: "" }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm font-medium">
              {itemLabel} #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className={showIcon ? "grid md:grid-cols-2 gap-3" : ""}>
            <div>
              <label className="block text-white/70 text-xs mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Title"
              />
            </div>
            {showIcon && (
              <div>
                <label className="block text-white/70 text-xs mb-1">
                  Icon Name (optional)
                </label>
                <input
                  type="text"
                  value={item.icon || ""}
                  onChange={(e) => updateItem(index, "icon", e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
                  placeholder="e.g., Shield, Star, Award"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-white/70 text-xs mb-1">
              Description
            </label>
            <textarea
              value={item.description}
              onChange={(e) =>
                updateItem(index, "description", e.target.value)
              }
              rows={2}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent resize-none"
              placeholder="Description..."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full bg-white/5 border border-dashed border-white/20 rounded-lg p-3 text-white/60 hover:text-white hover:border-white/40 transition-colors inline-flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        {addLabel}
      </button>
    </div>
  );
}

// Service Areas Editor
function ServiceAreasEditor({
  areas,
  onChange,
}: {
  areas: string[];
  onChange: (areas: string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-white/60 text-sm">
        List the areas you serve (one per line).
      </p>
      <textarea
        value={areas.join("\n")}
        onChange={(e) =>
          onChange(e.target.value.split("\n").filter((a) => a.trim()))
        }
        rows={8}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent resize-none"
        placeholder="Queens, NY&#10;Brooklyn, NY&#10;Bronx, NY&#10;Nassau County&#10;Suffolk County"
      />
    </div>
  );
}

// Contact Info Editor
function ContactInfoEditor({
  info,
  onChange,
}: {
  info: Record<string, string>;
  onChange: (info: Record<string, string>) => void;
}) {
  const updateField = (field: string, value: string) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white/70 text-xs mb-1">
          Phone Number
        </label>
        <input
          type="text"
          value={info.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="(718) 507-6543"
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-1">Fax Number</label>
        <input
          type="text"
          value={info.fax || ""}
          onChange={(e) => updateField("fax", e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="(718) 507-6544"
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={info.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="info@bonardiconstruction.com"
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-1">Address</label>
        <input
          type="text"
          value={info.address || ""}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="Queens, NY"
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-1">
          Business Hours
        </label>
        <input
          type="text"
          value={info.hours || ""}
          onChange={(e) => updateField("hours", e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="Mon-Fri: 7AM-6PM, Sat: 8AM-2PM"
        />
      </div>
    </div>
  );
}

// Story/About Text Editor
function StoryEditor({
  story,
  onChange,
}: {
  story: Record<string, string>;
  onChange: (story: Record<string, string>) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white/70 text-xs mb-1">Title</label>
        <input
          type="text"
          value={story.title || ""}
          onChange={(e) => onChange({ ...story, title: e.target.value })}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent"
          placeholder="Our Story"
        />
      </div>
      <div>
        <label className="block text-white/70 text-xs mb-1">Content</label>
        <textarea
          value={story.content || ""}
          onChange={(e) => onChange({ ...story, content: e.target.value })}
          rows={8}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:border-accent resize-none"
          placeholder="Tell your company's story..."
        />
      </div>
    </div>
  );
}

export default function SitePagesAdmin() {
  const [selectedPage, setSelectedPage] = useState<StaticPage | null>(null);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [seoData, setSeoData] = useState({ title: "", description: "" });
  const [hasCustomContent, setHasCustomContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadPageContent = async (page: StaticPage) => {
    setIsLoading(true);
    setError("");
    setSelectedPage(page);
    setSeoData(page.seo);

    try {
      const res = await fetch(`/api/admin/site-pages?slug=${page.slug}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPageContent(data.content || {});
      setHasCustomContent(data.hasCustomContent || false);
      if (data.content?.seo) {
        setSeoData(data.content.seo as { title: string; description: string });
      }
    } catch {
      setPageContent({});
      setHasCustomContent(false);
    } finally {
      setIsLoading(false);
    }
  };

  const savePage = async () => {
    if (!selectedPage) return;

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/site-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: selectedPage.slug,
          content: { ...pageContent, seo: seoData },
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setHasCustomContent(true);
      setSuccess("Page saved successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (section: string, value: unknown) => {
    setPageContent((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const getSectionData = <T,>(section: string, defaultValue: T): T => {
    return (pageContent[section] as T) || defaultValue;
  };

  const renderSectionEditor = (section: string) => {
    switch (section) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                value={
                  getSectionData<Record<string, string>>(section, {}).title ||
                  ""
                }
                onChange={(e) =>
                  updateSection(section, {
                    ...getSectionData<Record<string, string>>(section, {}),
                    title: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Hero title"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={
                  getSectionData<Record<string, string>>(section, {})
                    .subtitle || ""
                }
                onChange={(e) =>
                  updateSection(section, {
                    ...getSectionData<Record<string, string>>(section, {}),
                    subtitle: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Hero subtitle"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={
                  getSectionData<Record<string, string>>(section, {})
                    .description || ""
                }
                onChange={(e) =>
                  updateSection(section, {
                    ...getSectionData<Record<string, string>>(section, {}),
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none"
                placeholder="Hero description"
              />
            </div>
          </div>
        );

      case "cta":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                CTA Title
              </label>
              <input
                type="text"
                value={
                  getSectionData<Record<string, string>>(section, {}).title ||
                  ""
                }
                onChange={(e) =>
                  updateSection(section, {
                    ...getSectionData<Record<string, string>>(section, {}),
                    title: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                placeholder="Call to action title"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                CTA Description
              </label>
              <textarea
                value={
                  getSectionData<Record<string, string>>(section, {})
                    .description || ""
                }
                onChange={(e) =>
                  updateSection(section, {
                    ...getSectionData<Record<string, string>>(section, {}),
                    description: e.target.value,
                  })
                }
                rows={2}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none"
                placeholder="Call to action description"
              />
            </div>
          </div>
        );

      case "content":
        return (
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Page Content (HTML)
            </label>
            <textarea
              value={(pageContent.content as string) || ""}
              onChange={(e) => updateSection("content", e.target.value)}
              rows={15}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none font-mono text-sm"
              placeholder="<h2>Heading</h2><p>Content...</p>"
            />
          </div>
        );

      case "featuredReviews":
      case "testimonials":
        return (
          <ReviewsEditor
            reviews={getSectionData<ReviewItem[]>(section, [])}
            onChange={(reviews) => updateSection(section, reviews)}
          />
        );

      case "services":
        return (
          <ItemsEditor
            items={getSectionData<ServiceItem[]>(section, [])}
            onChange={(items) => updateSection(section, items)}
            itemLabel="Service"
            addLabel="Add Service"
            showIcon={true}
          />
        );

      case "whyChooseUs":
        return (
          <ItemsEditor
            items={getSectionData<ServiceItem[]>(section, [])}
            onChange={(items) => updateSection(section, items)}
            itemLabel="Benefit"
            addLabel="Add Benefit"
            showIcon={true}
          />
        );

      case "values":
        return (
          <ItemsEditor
            items={getSectionData<ValueItem[]>(section, [])}
            onChange={(items) => updateSection(section, items)}
            itemLabel="Value"
            addLabel="Add Value"
            showIcon={true}
          />
        );

      case "certifications":
        return (
          <ItemsEditor
            items={getSectionData<ServiceItem[]>(section, [])}
            onChange={(items) => updateSection(section, items)}
            itemLabel="Certification"
            addLabel="Add Certification"
            showIcon={false}
          />
        );

      case "serviceAreas":
        return (
          <ServiceAreasEditor
            areas={getSectionData<string[]>(section, [])}
            onChange={(areas) => updateSection(section, areas)}
          />
        );

      case "contactInfo":
        return (
          <ContactInfoEditor
            info={getSectionData<Record<string, string>>(section, {})}
            onChange={(info) => updateSection(section, info)}
          />
        );

      case "story":
        return (
          <StoryEditor
            story={getSectionData<Record<string, string>>(section, {})}
            onChange={(story) => updateSection(section, story)}
          />
        );

      default:
        return (
          <div className="text-white/60 text-sm">
            <p className="mb-4">
              This section can be customized. Add your content below.
            </p>
            <textarea
              value={
                typeof pageContent[section] === "object"
                  ? JSON.stringify(pageContent[section], null, 2)
                  : String(pageContent[section] || "")
              }
              onChange={(e) => {
                try {
                  updateSection(section, JSON.parse(e.target.value));
                } catch {
                  updateSection(section, e.target.value);
                }
              }}
              rows={6}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none font-mono text-sm"
              placeholder="Enter content or JSON data"
            />
          </div>
        );
    }
  };

  if (selectedPage) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPage(null)}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <selectedPage.icon className="w-6 h-6 text-accent" />
                {selectedPage.name}
                {!hasCustomContent && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    Default Content
                  </span>
                )}
                {hasCustomContent && (
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                    Customized
                  </span>
                )}
              </h1>
              <p className="text-white/60 mt-1">
                {selectedPage.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={selectedPage.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 inline-flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              View Page
            </a>
            <button
              onClick={savePage}
              disabled={isSaving}
              className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
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

        {/* SEO Fields */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            SEO Settings
          </h2>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Meta Title
            </label>
            <input
              type="text"
              value={seoData.title}
              onChange={(e) =>
                setSeoData({ ...seoData, title: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
              placeholder="Page title for search engines"
            />
            <p className="text-white/40 text-xs mt-1">
              {seoData.title.length}/60 characters recommended
            </p>
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Meta Description
            </label>
            <textarea
              value={seoData.description}
              onChange={(e) =>
                setSeoData({ ...seoData, description: e.target.value })
              }
              rows={2}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none"
              placeholder="Page description for search engines"
            />
            <p className="text-white/40 text-xs mt-1">
              {seoData.description.length}/160 characters recommended
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Section Editors */}
            {selectedPage.sections.map((section) => (
              <CollapsibleSection
                key={section}
                title={section}
                defaultOpen={section === "hero"}
              >
                {renderSectionEditor(section)}
              </CollapsibleSection>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Site Pages</h1>
        <p className="text-white/60 mt-1">
          Edit static pages like About, Contact, Gallery, etc.
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticPages.map((page) => (
          <button
            key={page.slug}
            onClick={() => loadPageContent(page)}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center">
                <page.icon className="w-6 h-6 text-brand" />
              </div>
              <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="font-semibold text-white mt-4 group-hover:text-accent transition-colors">
              {page.name}
            </h3>
            <p className="text-sm text-white/60 mt-1">{page.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-white/40">{page.path}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-2">About Site Pages</h3>
        <p className="text-white/60 text-sm">
          Site pages are the core static pages of your website. You can
          customize text, headings, reviews, and other content through this
          editor. Changes will be saved to the database and override the
          default content.
        </p>
      </div>
    </div>
  );
}
