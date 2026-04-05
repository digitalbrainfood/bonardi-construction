"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Loader2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Link2,
  Camera,
  Shield,
  Search,
} from "lucide-react";

interface SiteSettings {
  // Company Info
  companyName: string;
  phone: string;
  fax: string;
  email: string;
  address: string;
  // Social Links
  facebook: string;
  instagram: string;
  // Business Hours
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  // License Numbers
  licenseNYC: string;
  licenseNassau: string;
  licenseSuffolk: string;
  // SEO Defaults
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  ogImage: string;
}

const defaultSettings: SiteSettings = {
  companyName: "Bonardi Construction",
  phone: "(718) 507-6543",
  fax: "(718) 507-6544",
  email: "info@bonardiconstruction.com",
  address: "Queens, NY",
  facebook: "https://www.facebook.com/BonardiConstruction",
  instagram: "https://www.instagram.com/bonardiconstruction",
  hoursWeekday: "Mon-Fri: 7:00 AM - 6:00 PM",
  hoursSaturday: "Sat: 8:00 AM - 2:00 PM",
  hoursSunday: "Sun: Closed",
  licenseNYC: "LIC# 2049498-DCA",
  licenseNassau: "LIC# H1809170000",
  licenseSuffolk: "LIC# 54109-H",
  defaultMetaTitle:
    "Bonardi Construction | NYC & Long Island General Contractor",
  defaultMetaDescription:
    "Over 60 years of construction excellence. Bonardi Construction provides asphalt paving, concrete, roofing, masonry, new construction, and restoration services across NYC, Nassau & Suffolk County.",
  ogImage: "/images/bonardi-og.jpg",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (data.data) {
        setSettings({ ...defaultSettings, ...data.data });
      }
    } catch {
      // Use defaults on error
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess("Settings saved successfully");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save settings"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/60 mt-1">
            Configure your website settings
          </p>
        </div>
        <button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-accent hover:bg-accent/90 text-gray-900 font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isSaving ? "Saving..." : "Save Settings"}
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

      {/* Company Information */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-accent" />
          Company Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Company Name
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => updateSetting("companyName", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => updateSetting("phone", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Fax Number
            </label>
            <input
              type="tel"
              value={settings.fax}
              onChange={(e) => updateSetting("fax", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting("email", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-white/80 text-sm font-medium mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => updateSetting("address", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white">Social Links</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Link2 className="w-4 h-4 inline mr-2" />
              Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebook}
              onChange={(e) => updateSetting("facebook", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Camera className="w-4 h-4 inline mr-2" />
              Instagram URL
            </label>
            <input
              type="url"
              value={settings.instagram}
              onChange={(e) => updateSetting("instagram", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
              placeholder="https://instagram.com/yourpage"
            />
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Business Hours
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Monday - Friday
            </label>
            <input
              type="text"
              value={settings.hoursWeekday}
              onChange={(e) => updateSetting("hoursWeekday", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="Mon-Fri: 7:00 AM - 6:00 PM"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Saturday
            </label>
            <input
              type="text"
              value={settings.hoursSaturday}
              onChange={(e) =>
                updateSetting("hoursSaturday", e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="Sat: 8:00 AM - 2:00 PM"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Sunday
            </label>
            <input
              type="text"
              value={settings.hoursSunday}
              onChange={(e) => updateSetting("hoursSunday", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="Sun: Closed"
            />
          </div>
        </div>
      </div>

      {/* License Numbers */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          License Numbers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              NYC License
            </label>
            <input
              type="text"
              value={settings.licenseNYC}
              onChange={(e) => updateSetting("licenseNYC", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="LIC# 2049498-DCA"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Nassau County License
            </label>
            <input
              type="text"
              value={settings.licenseNassau}
              onChange={(e) =>
                updateSetting("licenseNassau", e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="LIC# H1809170000"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Suffolk County License
            </label>
            <input
              type="text"
              value={settings.licenseSuffolk}
              onChange={(e) =>
                updateSetting("licenseSuffolk", e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="LIC# 54109-H"
            />
          </div>
        </div>
      </div>

      {/* SEO Defaults */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-accent" />
          SEO Defaults
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Default Meta Title
            </label>
            <input
              type="text"
              value={settings.defaultMetaTitle}
              onChange={(e) =>
                updateSetting("defaultMetaTitle", e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
              placeholder="Bonardi Construction | NYC & Long Island General Contractor"
            />
            <p className="text-white/40 text-sm mt-1">
              {settings.defaultMetaTitle.length}/60 characters recommended
            </p>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Default Meta Description
            </label>
            <textarea
              value={settings.defaultMetaDescription}
              onChange={(e) =>
                updateSetting("defaultMetaDescription", e.target.value)
              }
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent resize-none"
              placeholder="Describe your business for search engines..."
            />
            <p className="text-white/40 text-sm mt-1">
              {settings.defaultMetaDescription.length}/160 characters
              recommended
            </p>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Default OG Image URL
            </label>
            <input
              type="text"
              value={settings.ogImage}
              onChange={(e) => updateSetting("ogImage", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
              placeholder="/images/bonardi-og.jpg"
            />
            <p className="text-white/40 text-sm mt-1">
              Recommended size: 1200x630 pixels
            </p>
          </div>
        </div>
      </div>

      {/* Environment Info */}
      <div className="bg-brand/10 border border-brand/20 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-2">
          Environment Variables
        </h3>
        <p className="text-white/60 text-sm mb-4">
          Some settings require environment variables to be configured:
        </p>
        <ul className="text-white/60 text-sm space-y-1">
          <li>
            &bull; NEXT_PUBLIC_SUPABASE_URL - Supabase project URL
          </li>
          <li>
            &bull; NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase anonymous key
          </li>
          <li>
            &bull; SUPABASE_SERVICE_ROLE_KEY - Supabase service role key
          </li>
          <li>&bull; ANTHROPIC_API_KEY - For AI content generation</li>
          <li>&bull; RESEND_API_KEY - For email notifications</li>
          <li>
            &bull; ADMIN_EMAIL - Email for chat notifications
          </li>
        </ul>
      </div>
    </div>
  );
}
