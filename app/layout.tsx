import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://bonardiconst.com"),
  title: {
    default: "Bonardi Construction | General Contracting — Queens, NY",
    template: "%s | Bonardi Construction",
  },
  description:
    "Bonardi Construction, Inc. — 30 years of expert general contracting across Queens, Brooklyn, Nassau & Suffolk County. Residential, commercial, asphalt, masonry, roofing & more.",
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
    title: "Bonardi Construction | General Contracting — Queens, NY",
    description:
      "30 years of expert general contracting across Queens, Brooklyn, Nassau & Suffolk County.",
    images: [],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
