/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // Old service slugs → new slugs (SEO parity with bonardiconst.com)
      { source: "/services/roofing", destination: "/services/roofing-services", permanent: true },
      { source: "/services/masonry", destination: "/services/masonry-brick-pointing", permanent: true },
      { source: "/services/home-additions", destination: "/services/home-additions-extensions", permanent: true },
      { source: "/services/foundation-repair", destination: "/services/foundation-repair-restoration", permanent: true },
      { source: "/services/water-mold-restoration", destination: "/services/water-and-mold-restoration", permanent: true },
      { source: "/services/generators", destination: "/services/generac-generators", permanent: true },
      { source: "/services/asphalt-sealcoating", destination: "/services/asphalt/sealcoating", permanent: true },
      // Contact page rename
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
};

module.exports = nextConfig;
