import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";
import { getSettings } from "@/lib/settings";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL("https://www.bonardiconst.com"),
    title: {
      default: settings.defaultMetaTitle,
      template: "%s | Bonardi Construction",
    },
    description: settings.defaultMetaDescription,
    keywords: [
      "general contractor Queens NY",
      "construction company Queens",
      "asphalt paving Queens",
      "masonry contractor NYC",
      "roofing contractor Queens",
      "Bonardi Construction",
    ],
    openGraph: {
      siteName: "Bonardi Construction, Inc.",
      locale: "en_US",
      type: "website",
      url: "/",
      title: settings.defaultMetaTitle,
      description: settings.defaultMetaDescription,
      images: settings.ogImage ? [settings.ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <LayoutShell settings={settings}>{children}</LayoutShell>
      </body>
    </html>
  );
}
