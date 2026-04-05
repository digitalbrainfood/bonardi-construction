"use client";

import { useState } from "react";
import {
  Upload,
  Trash2,
  Plus,
  Grid,
  List,
  Search,
  Filter,
  Image as ImageIcon,
} from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
}

const categories = [
  "All",
  "Asphalt & Paving",
  "Concrete & Masonry",
  "Roofing",
  "New Construction",
  "Hardscaping",
  "Restoration",
  "Commercial",
];

// Pre-populated gallery images from lib/images.ts Unsplash URLs
const u = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const initialImages: GalleryImage[] = [
  // Asphalt & Paving
  {
    id: "1",
    title: "Commercial Parking Lot Paving",
    url: u("photo-1558618666-fcd25c85f7e7"),
    category: "Asphalt & Paving",
    created_at: "2025-10-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Driveway Resurfacing",
    url: u("photo-1590496793929-36417d3117de"),
    category: "Asphalt & Paving",
    created_at: "2025-09-15T00:00:00Z",
  },
  {
    id: "3",
    title: "Asphalt Sealcoating",
    url: u("photo-1517089596392-fb9a9033e05b"),
    category: "Asphalt & Paving",
    created_at: "2025-09-01T00:00:00Z",
  },
  // Concrete & Masonry
  {
    id: "4",
    title: "Foundation Work",
    url: u("photo-1541888946425-d81bb19240f5"),
    category: "Concrete & Masonry",
    created_at: "2025-08-20T00:00:00Z",
  },
  {
    id: "5",
    title: "Concrete Sidewalk Installation",
    url: u("photo-1504307651254-35680f356dfd"),
    category: "Concrete & Masonry",
    created_at: "2025-08-10T00:00:00Z",
  },
  {
    id: "6",
    title: "Brick Pointing Restoration",
    url: u("photo-1587582423116-ec07293f0395"),
    category: "Concrete & Masonry",
    created_at: "2025-07-25T00:00:00Z",
  },
  // Roofing
  {
    id: "7",
    title: "Residential Roof Replacement",
    url: u("photo-1632759145351-1d592919f522"),
    category: "Roofing",
    created_at: "2025-07-15T00:00:00Z",
  },
  {
    id: "8",
    title: "Flat Roof Installation",
    url: u("photo-1625722662825-d9b7837a5bf0"),
    category: "Roofing",
    created_at: "2025-07-01T00:00:00Z",
  },
  {
    id: "9",
    title: "Commercial Roofing Project",
    url: u("photo-1600585154340-be6161a56a0c"),
    category: "Roofing",
    created_at: "2025-06-20T00:00:00Z",
  },
  // New Construction
  {
    id: "10",
    title: "Custom Home Build",
    url: u("photo-1503387762-592deb58ef4e"),
    category: "New Construction",
    created_at: "2025-06-10T00:00:00Z",
  },
  {
    id: "11",
    title: "Commercial Building Construction",
    url: u("photo-1486406146926-c627a92ad1ab"),
    category: "New Construction",
    created_at: "2025-05-25T00:00:00Z",
  },
  // Hardscaping
  {
    id: "12",
    title: "Paver Patio Installation",
    url: u("photo-1600585154526-990dced4db0d"),
    category: "Hardscaping",
    created_at: "2025-05-15T00:00:00Z",
  },
  {
    id: "13",
    title: "Retaining Wall Construction",
    url: u("photo-1600566753190-17f0baa2a6c3"),
    category: "Hardscaping",
    created_at: "2025-05-01T00:00:00Z",
  },
  // Restoration
  {
    id: "14",
    title: "Fire Damage Restoration",
    url: u("photo-1585128903994-9788298932a5"),
    category: "Restoration",
    created_at: "2025-04-20T00:00:00Z",
  },
  {
    id: "15",
    title: "Water Damage Repair",
    url: u("photo-1517581177684-1a54ed4f51bf"),
    category: "Restoration",
    created_at: "2025-04-10T00:00:00Z",
  },
  // Commercial
  {
    id: "16",
    title: "Office Buildout",
    url: u("photo-1497366216548-37526070297c"),
    category: "Commercial",
    created_at: "2025-03-28T00:00:00Z",
  },
  {
    id: "17",
    title: "Commercial Parking Lot Maintenance",
    url: u("photo-1621922688758-1e16a9c0d71a"),
    category: "Commercial",
    created_at: "2025-03-15T00:00:00Z",
  },
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filteredImages = images.filter((img) => {
    const matchesCategory =
      activeCategory === "All" || img.category === activeCategory;
    const matchesSearch = img.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const deleteImage = (id: string) => {
    if (!confirm("Delete this image?")) return;
    setImages((prev) => prev.filter((img) => img.id !== id));
    setSuccess("Image deleted");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement actual upload with Supabase storage
    setError(
      "Upload not yet connected. Configure Supabase storage to enable uploads."
    );
    setTimeout(() => setError(""), 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <p className="text-white/60 mt-1">
            Manage project photos and images
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-white/10 text-white"
                  : "text-white/60"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-white/10 text-white"
                  : "text-white/60"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Images
          </button>
        </div>
      </div>

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

      {/* Upload Area */}
      {showUpload && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-accent/50 transition-colors cursor-pointer"
        >
          <Upload className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Upload Images
          </h3>
          <p className="text-white/60 mb-4">
            Drag and drop images here, or click to browse
          </p>
          <p className="text-white/40 text-sm">
            Supports: JPG, PNG, WebP (max 5MB each)
          </p>
        </div>
      )}

      {/* Setup Notice */}
      {showUpload && (
        <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-2">
            Gallery Setup Required
          </h3>
          <p className="text-white/60 text-sm">
            To enable uploads, you need to:
          </p>
          <ol className="list-decimal list-inside text-white/60 text-sm mt-2 space-y-1">
            <li>
              Create a Supabase storage bucket named
              &quot;gallery-images&quot;
            </li>
            <li>Set the bucket to public access</li>
            <li>Configure RLS policies for authenticated uploads</li>
          </ol>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent [&>option]:bg-gray-900 [&>option]:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              activeCategory === cat
                ? "bg-accent text-gray-900 font-medium"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-xs opacity-60">
                {images.filter((img) => img.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Image Grid / List */}
      {filteredImages.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No images found
          </h3>
          <p className="text-white/60 mb-4">
            {searchQuery || activeCategory !== "All"
              ? "Try adjusting your filters"
              : "Upload your first project photos to build your gallery"}
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Images
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium truncate">
                  {img.title}
                </p>
                <p className="text-accent text-xs mt-1">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  Image
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4">
                  Title
                </th>
                <th className="text-left text-white/60 font-medium px-6 py-4 hidden md:table-cell">
                  Category
                </th>
                <th className="text-right text-white/60 font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((img) => (
                <tr
                  key={img.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-6 py-3">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-white font-medium">{img.title}</p>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className="text-accent text-sm">{img.category}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="p-2 text-white/60 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{images.length}</p>
          <p className="text-white/60 text-sm">Total Images</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {new Set(images.map((i) => i.category)).size}
          </p>
          <p className="text-white/60 text-sm">Categories</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">
            {filteredImages.length}
          </p>
          <p className="text-white/60 text-sm">Showing</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-accent">Unsplash</p>
          <p className="text-white/60 text-sm">Image Source</p>
        </div>
      </div>
    </div>
  );
}
