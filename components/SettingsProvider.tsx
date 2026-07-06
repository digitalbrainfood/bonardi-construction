"use client";

import { createContext, useContext } from "react";
import { defaultSettings, type SiteSettings } from "@/lib/settings";

// Client-side access to the site settings resolved on the server.
// Defaults ensure components render real values even outside the provider.
const SettingsContext = createContext<SiteSettings>(defaultSettings);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SettingsContext);
}
