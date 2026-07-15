import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api/", "/thank-you"],
    },
    sitemap: "https://www.bonardiconst.com/sitemap.xml",
  };
}
