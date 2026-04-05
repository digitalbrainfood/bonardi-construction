"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Save,
  X,
  Star,
  Search,
} from "lucide-react";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  featured: boolean;
  created_at: string;
}

const services = [
  "Asphalt Paving",
  "Concrete",
  "Roofing",
  "Masonry & Brick Pointing",
  "New Construction",
  "Home Additions",
  "Foundation Repair",
  "Fire Restoration",
  "Water & Mold Restoration",
  "Waterproofing",
  "Hardscaping",
  "Demolition",
  "Excavation",
  "Drainage",
  "General Construction",
];

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Maria S.",
    location: "Bayside, NY",
    rating: 5,
    text: "Bonardi Construction transformed our backyard into a stunning outdoor living space. The stone patio and retaining walls exceeded our expectations. Their attention to detail is unmatched.",
    service: "Hardscaping",
    featured: true,
    created_at: "2025-11-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Robert K.",
    location: "Flushing, NY",
    rating: 5,
    text: "After our house fire, they handled everything from demolition to rebuild. Their team was compassionate, professional, and delivered our home back better than before. We are forever grateful.",
    service: "Fire Restoration",
    featured: true,
    created_at: "2025-10-20T00:00:00Z",
  },
  {
    id: "3",
    name: "James & Linda P.",
    location: "Garden City, NY",
    rating: 5,
    text: "Best roofing contractor we've used in over 20 years. They replaced our entire roof in two days, cleaned up perfectly, and the price was very fair. Highly recommend to anyone on Long Island.",
    service: "Roofing",
    featured: true,
    created_at: "2025-09-10T00:00:00Z",
  },
  {
    id: "4",
    name: "David M.",
    location: "Nassau County",
    rating: 5,
    text: "They repaved our entire commercial parking lot over a weekend to minimize business disruption. The asphalt work is flawless and has held up beautifully through two harsh winters already.",
    service: "Asphalt Paving",
    featured: false,
    created_at: "2025-08-05T00:00:00Z",
  },
  {
    id: "5",
    name: "Sarah T.",
    location: "Queens, NY",
    rating: 5,
    text: "Foundation issues had us worried we'd lose our home. Bonardi's team assessed the damage quickly, explained every step, and completed the repair on time and on budget. True professionals.",
    service: "Foundation Repair",
    featured: false,
    created_at: "2025-07-18T00:00:00Z",
  },
  {
    id: "6",
    name: "Michael R.",
    location: "Suffolk County",
    rating: 5,
    text: "Professional from start to finish. Our new construction project was completed on schedule with exceptional craftsmanship. Gary personally oversaw every phase. We couldn't be happier.",
    service: "New Construction",
    featured: true,
    created_at: "2025-06-22T00:00:00Z",
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
    service: "General Construction",
    featured: false,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      // If API returns empty, use initial data
      setReviews(data.length > 0 ? data : initialReviews);
    } catch {
      // Fallback to initial reviews on fetch failure
      setReviews(initialReviews);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewReview = () => {
    setEditingReview(null);
    setFormData({
      name: "",
      location: "",
      rating: 5,
      text: "",
      service: "General Construction",
      featured: false,
    });
    setIsEditing(true);
  };

  const editReview = (review: Review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      location: review.location,
      rating: review.rating,
      text: review.text,
      service: review.service,
      featured: review.featured,
    });
    setIsEditing(true);
  };

  const saveReview = async () => {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const method = editingReview ? "PUT" : "POST";
      const body = editingReview
        ? { id: editingReview.id, ...formData }
        : formData;

      const res = await fetch("/api/admin/reviews", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Update local state
      if (editingReview) {
        setReviews((prev) =>
          prev.map((r) =>
            r.id === editingReview.id ? { ...r, ...formData } : r
          )
        );
      } else {
        const newReview: Review = {
          id: String(Date.now()),
          ...formData,
          created_at: new Date().toISOString(),
        };
        setReviews((prev) => [newReview, ...prev]);
      }

      setSuccess(editingReview ? "Review updated" : "Review added");
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save review");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;

    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setReviews((prev) => prev.filter((r) => r.id !== id));
      setSuccess("Review deleted");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete review"
      );
    }
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            {editingReview ? "Edit Review" : "Add Review"}
          </h1>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                placeholder="Maria S."
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                placeholder="Bayside, NY"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? "text-accent fill-accent"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Service
              </label>
              <select
                value={formData.service}
                onChange={(e) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent [&>option]:bg-gray-900 [&>option]:text-white"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Review Text
            </label>
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent resize-none"
              placeholder="Customer's review..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-5 h-5 rounded border-white/20 bg-white/10 text-accent focus:ring-accent"
            />
            <label htmlFor="featured" className="text-white">
              Featured review (shown prominently on homepage)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 text-white/70 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={saveReview}
              disabled={isSaving || !formData.name || !formData.text}
              className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Review"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-white/60 mt-1">Manage customer testimonials</p>
        </div>
        <button
          onClick={startNewReview}
          className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search reviews..."
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Star className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No reviews yet
          </h3>
          <p className="text-white/60 mb-4">Add your first customer review</p>
          <button
            onClick={startNewReview}
            className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-6 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`bg-white/5 border rounded-xl p-6 ${
                review.featured ? "border-accent/50" : "border-white/10"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    {review.featured && (
                      <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{review.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => editReview(review)}
                    className="p-2 text-white/60 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-accent fill-accent"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm line-clamp-3">
                {review.text}
              </p>
              <p className="text-accent text-xs mt-3">{review.service}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
