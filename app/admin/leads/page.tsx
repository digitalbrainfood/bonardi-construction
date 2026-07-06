"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Loader2,
  Search,
  Trash2,
  Mail,
  Phone,
  MapPin,
  RefreshCw,
  Wrench,
} from "lucide-react";

type LeadStatus = "new" | "contacted" | "closed";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  project_type: string | null;
  address: string | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

const STATUSES: LeadStatus[] = ["new", "contacted", "closed"];

const statusBadgeStyles: Record<LeadStatus, string> = {
  new: "bg-blue-500/20 text-blue-300",
  contacted: "bg-accent/20 text-accent",
  closed: "bg-green-500/20 text-green-300",
};

const statusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setLeads(data);
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : "Failed to load leads"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, ...data } : lead))
      );
      setSuccess(`Lead marked as ${statusLabels[status].toLowerCase()}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update lead"
      );
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      setSuccess("Lead deleted");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete lead"
      );
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      lead.name.toLowerCase().includes(q) ||
      (lead.email || "").toLowerCase().includes(q) ||
      (lead.phone || "").toLowerCase().includes(q)
    );
  });

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="text-white/60 mt-1">
          Contact form submissions and quote requests
        </p>
      </div>

      {fetchError && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-red-200">
            Couldn&apos;t load leads: {fetchError}
          </p>
          <button
            onClick={fetchLeads}
            className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
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

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: counts.total, color: "text-white" },
          { label: "New", value: counts.new, color: "text-blue-400" },
          { label: "Contacted", value: counts.contacted, color: "text-accent" },
          { label: "Closed", value: counts.closed, color: "text-green-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <Inbox className={`w-5 h-5 ${stat.color}`} />
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search + status filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          {(["all", ...STATUSES] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-accent text-gray-900"
                  : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {status === "all" ? "All" : statusLabels[status]}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Inbox className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            {leads.length === 0 ? "No leads yet" : "No matching leads"}
          </h3>
          <p className="text-white/60">
            {leads.length === 0
              ? "No leads yet — contact form submissions will appear here."
              : "Try a different search or status filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-white">{lead.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${statusBadgeStyles[lead.status]}`}
                    >
                      {statusLabels[lead.status]}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">
                    {formatDate(lead.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateStatus(lead.id, e.target.value as LeadStatus)
                    }
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent [&>option]:bg-gray-900 [&>option]:text-white"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-3">
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80"
                  >
                    <Mail className="w-4 h-4" />
                    {lead.email}
                  </a>
                )}
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80"
                  >
                    <Phone className="w-4 h-4" />
                    {lead.phone}
                  </a>
                )}
                {(lead.service || lead.project_type) && (
                  <span className="inline-flex items-center gap-1.5 text-white/70 capitalize">
                    <Wrench className="w-4 h-4 text-white/40" />
                    {[lead.service, lead.project_type]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
                {lead.address && (
                  <span className="inline-flex items-center gap-1.5 text-white/70">
                    <MapPin className="w-4 h-4 text-white/40" />
                    {lead.address}
                  </span>
                )}
              </div>

              {lead.message && (
                <p className="text-white/80 text-sm whitespace-pre-wrap">
                  {lead.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
