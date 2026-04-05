# Bonardi Construction — Next.js Website

A professional rebuild of [bonardiconst.com](https://bonardiconst.com) using **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

## Design System

**Aesthetic**: Industrial luxury — dark obsidian backgrounds, warm gold accents, editorial Playfair Display serif headings paired with DM Sans body text.

| Token       | Value     | Use              |
|-------------|-----------|------------------|
| `obsidian`  | `#0D0D0B` | Page background  |
| `carbon`    | `#161614` | Section alt bg   |
| `charcoal`  | `#1E1E1B` | Card backgrounds |
| `gold`      | `#C9A44A` | Primary accent   |
| `ivory`     | `#F2EDE4` | Headings/text    |
| `ash`       | `#B0AFA6` | Body copy        |
| `cement`    | `#7A7A72` | Secondary text   |

**Fonts**: Playfair Display (display/headings) · DM Sans (body) · DM Mono (labels/code)

## Project Structure

```
bonardi-construction/
├── app/
│   ├── globals.css              # Base styles, CSS variables, animations
│   ├── layout.tsx               # Root layout with fonts + metadata
│   ├── page.tsx                 # Homepage composition
│   ├── not-found.tsx            # Custom 404 page
│   ├── sitemap.ts               # Auto-generated XML sitemap
│   ├── robots.ts                # robots.txt
│   ├── about/
│   │   └── page.tsx             # About + Gary Bonelli bio + certifications
│   ├── contact/
│   │   └── page.tsx             # Contact form (residential/commercial toggle)
│   ├── services/
│   │   ├── page.tsx             # Services index (all 21 services, categorized)
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic service detail with related services
│   ├── gallery/
│   │   └── page.tsx             # Filterable gallery with lightbox
│   ├── blog/
│   │   └── page.tsx             # Blog index with featured post
│   └── api/
│       └── contact/
│           └── route.ts         # Contact form API route (wire to Resend/SendGrid)
├── components/
│   ├── Navbar.tsx               # Sticky nav with mega dropdown + mobile drawer
│   ├── Hero.tsx                 # Full-screen hero with animated SVG underline
│   ├── Stats.tsx                # Intersection Observer count-up section
│   ├── Services.tsx             # Categorized services grid
│   ├── WhyUs.tsx                # 6-pillar value proposition
│   ├── ServiceAreas.tsx         # Geographic coverage + license numbers
│   ├── ContactCTA.tsx           # Bottom contact section
│   └── Footer.tsx               # Multi-column footer
├── lib/
│   └── services-data.ts         # All 21 service definitions (slug, bullets, related)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## What's Included

### Pages
- ✅ **Homepage** — Hero, stats, services, why us, service areas, contact CTA
- ✅ **About** — Company story, core values, Gary Bonelli bio, certifications & partners
- ✅ **Services Index** — All 21 services categorized: Residential / Exterior & Site / Commercial & Specialty
- ✅ **Service Detail** (dynamic `[slug]`) — Unique page for all 21 services with bullets, intro, CTA, related services
- ✅ **Gallery** — Filterable grid by category, click-to-open lightbox
- ✅ **Blog** — Featured post + 5-card grid layout
- ✅ **Contact** — Full quote form with residential/commercial toggle, project type select
- ✅ **404** — Branded not-found page

### Technical
- ✅ Sticky navbar: mega services dropdown + animated mobile drawer
- ✅ Animated count-up stats (Intersection Observer triggered)
- ✅ `generateStaticParams` for all 21 service pages (SSG)
- ✅ `generateMetadata` per page (SEO)
- ✅ Auto-generated `/sitemap.xml` and `robots.txt`
- ✅ `/api/contact` route ready for Resend / SendGrid integration
- ✅ `lib/services-data.ts` — single source of truth for all service content

### Design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Industrial luxury aesthetic: obsidian + gold + Playfair Display
- ✅ Noise texture overlay, gold gradient accents, structural grid lines
- ✅ Custom scrollbar, text selection highlight
- ✅ CSS SVG animated underline in hero headline

## Next Steps (Suggested)

1. **Images**: Add real project photography to `/public/images/`. Update Hero, Services, Gallery with `next/image`.
2. **Contact Form**: Wire up the `/contact` page with a form + email via Resend/SendGrid or a CMS form provider.
3. **Gallery Page**: Build `/app/gallery/page.tsx` with a masonry grid of project photos.
4. **Service Detail Pages**: Add individual service pages under `/app/services/[slug]/page.tsx`.
5. **CMS**: Connect to Sanity, Contentful, or similar for blog posts and project updates.
6. **Analytics**: Add Google Analytics or Plausible via `app/layout.tsx`.
7. **Maps**: Embed Google Maps in `ServiceAreas.tsx` using `@react-google-maps/api`.
8. **Animations**: Enhance with `framer-motion` for scroll-triggered section reveals.
