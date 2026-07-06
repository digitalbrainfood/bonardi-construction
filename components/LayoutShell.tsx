"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

import CookieConsent from "@/components/CookieConsent";
import SocialProof from "@/components/SocialProof";
import { ChatWrapper } from "@/components/chat";
import { SettingsProvider } from "@/components/SettingsProvider";
import type { SiteSettings } from "@/lib/settings";

export default function LayoutShell({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <SettingsProvider settings={settings}>{children}</SettingsProvider>;
  }

  return (
    <SettingsProvider settings={settings}>
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer settings={settings} />
      <BackToTop />
      <ChatWrapper />
      <SocialProof />
      <CookieConsent />
    </SettingsProvider>
  );
}
