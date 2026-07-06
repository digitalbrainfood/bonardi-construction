"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Upload,
  Trash2,
  Plus,
  Grid,
  List,
  Search,
  Filter,
  Image as ImageIcon,
  Loader2,
  X,
  RefreshCw,
} from "lucide-react";

interface GalleryImage {
  id: string;
  title: string | null;
  url: string;
  category: string | null;
  created_at: string;
}

const uploadCategories = [
  "Commercial Paving",
  "Residential Paving",
  "Roofing",
  "Office Buildouts",
  "Home Extensions",
  "Drainage & Drywells",
  "Commercial Projects",
];

const categories = ["All", ...uploadCategories];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload form state
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState(uploadCategories[0]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (data && data.error) || `Request failed (${res.status})`
        );
      }
      setImages(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setImages([]);
      setLoadError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const filteredImages = images.filter((img) => {
    const matchesCategory =
      activeCategory === "All" || img.category === activeCategory;
    const matchesSearch = (img.title || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectFile = (file: File | undefined | null) => {
    if (!file || uploading) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP).");
      setTimeout(() => setError(""), 5000);
      return;
    }
    setPendingFile(file);
    // Default the title to the filename (without extension)
    setUploadTitle(file.name.replace(/\.[^.]+$/, ""));
    setError("");
  };

  const cancelUpload = () => {
    if (uploading) return;
    setPendingFile(null);
    setUploadTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!pendingFile || uploading) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", pendingFile);
      formData.append("title", uploadTitle.trim() || pendingFile.name);
      formData.append("category", uploadCategory);

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (data && data.error) || `Upload failed (${res.status})`
        );
      }

      setPendingFile(null);
      setUploadTitle("");
      setShowUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess("Image uploaded");
      setTimeout(() => setSuccess(""), 3000);
      await fetchImages();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? `Upload failed: ${err.message}`
          : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    setError("");
    try {
      const res = await fetch(
        `/api/admin/gallery?id=${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (data && data.error) || `Delete failed (${res.status})`
        );
      }
      setImages((prev) => prev.filter((img) => img.id !== id));
      setSuccess("Image deleted");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? `Delete failed: ${err.message}`
          : "Delete failed. Please try again."
      );
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectFile(e.dataTransfer.files?.[0]);
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

      {loadError && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          <p className="font-medium">
            Could not reach the database. Gallery images can&apos;t be loaded
            right now.
          </p>
          <p className="text-sm mt-1 text-red-200/70">{loadError}</p>
          <button
            onClick={fetchImages}
            className="mt-3 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}
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
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => selectFile(e.target.files?.[0])}
          />

          {!pendingFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-accent/50 transition-colors cursor-pointer"
            >
              <Upload className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Upload Images
              </h3>
              <p className="text-white/60 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <p className="text-white/40 text-sm">
                Supports: JPG, PNG, WebP (max 5MB each)
              </p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <ImageIcon className="w-5 h-5 text-accent flex-shrink-0" />
                  <p className="text-white text-sm truncate">
                    {pendingFile.name}
                    <span className="text-white/40 ml-2">
                      {(pendingFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </p>
                </div>
                <button
                  onClick={cancelUpload}
                  disabled={uploading}
                  className="p-2 text-white/60 hover:text-white disabled:opacity-50"
                  aria-label="Remove selected file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    disabled={uploading}
                    placeholder="Image title"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    disabled={uploading}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent disabled:opacity-50 [&>option]:bg-gray-900 [&>option]:text-white"
                  >
                    {uploadCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload
                    </>
                  )}
                </button>
                <button
                  onClick={cancelUpload}
                  disabled={uploading}
                  className="bg-white/5 hover:bg-white/10 text-white/80 font-medium px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Loader2 className="w-8 h-8 text-white/40 mx-auto mb-4 animate-spin" />
          <p className="text-white/60">Loading gallery...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No images found
          </h3>
          <p className="text-white/60 mb-4">
            {loadError
              ? "Images will appear here once the database is reachable again."
              : searchQuery || activeCategory !== "All"
              ? "Try adjusting your filters"
              : "Upload your first project photos to build your gallery"}
          </p>
          {!loadError && (
            <button
              onClick={() => setShowUpload(true)}
              className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Upload Images
            </button>
          )}
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
                  alt={img.title || "Gallery image"}
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
                  {img.title || "Untitled"}
                </p>
                <p className="text-accent text-xs mt-1">
                  {img.category || "Uncategorized"}
                </p>
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
                      alt={img.title || "Gallery image"}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <p className="text-white font-medium">
                      {img.title || "Untitled"}
                    </p>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className="text-accent text-sm">
                      {img.category || "Uncategorized"}
                    </span>
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
            {new Set(images.map((i) => i.category).filter(Boolean)).size}
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
          <p className="text-2xl font-bold text-accent">Supabase</p>
          <p className="text-white/60 text-sm">Image Source</p>
        </div>
      </div>
    </div>
  );
}
