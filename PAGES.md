# Bonardi Construction — Complete Page Index

## Public Pages (32 routes + 8 blog posts + 15 area pages)

### Main Pages
| Page | Route | File |
|------|-------|------|
| Home | `/` | `app/page.tsx` |
| About | `/about` | `app/about/page.tsx` |
| Services Directory | `/services` | `app/services/page.tsx` |
| Contact Us | `/contact-us` | `app/contact-us/page.tsx` |
| Blog | `/blog` | `app/blog/page.tsx` |
| Gallery | `/gallery` | `app/gallery/page.tsx` |
| Gary M. Bonelli | `/gary-m-bonelli` | `app/gary-m-bonelli/page.tsx` |
| Areas We Serve | `/areas-we-serve` | `app/areas-we-serve/page.tsx` |
| Thank You | `/thank-you` | `app/thank-you/page.tsx` |
| 404 Not Found | (auto) | `app/not-found.tsx` |

### Service Detail Pages (35 pages)
| Service | Route |
|---------|-------|
| Asphalt Services | `/services/asphalt` |
| Asphalt Sealcoating | `/services/asphalt/sealcoating` |
| Asphalt Milling | `/services/asphalt-milling` |
| Concrete, Blacktop & Striping | `/services/concrete` |
| Concrete/Blacktop/Striping | `/services/concreteblacktop-striping` |
| Roofing Services | `/services/roofing-services` |
| Masonry, Brick Pointing | `/services/masonry-brick-pointing` |
| Masonry Restoration | `/services/masonry-restoration` |
| New Construction | `/services/new-construction` |
| Home Additions & Extensions | `/services/home-additions-extensions` |
| Dormer Additions | `/services/dormer-additions` |
| Foundation Repair & Restoration | `/services/foundation-repair-restoration` |
| Fire Damage Restoration | `/services/fire-damage-restoration` |
| Water & Mold Restoration | `/services/water-and-mold-restoration` |
| Waterproofing | `/services/waterproofing` |
| Hardscaping | `/services/hardscaping` |
| Demolition | `/services/demolition` |
| Drainage Solutions | `/services/drainage` |
| Excavation | `/services/excavation` |
| Construction Management | `/services/construction-management` |
| Construction Consultation | `/services/construction-consultation` |
| Office Buildouts | `/services/office-buildouts` |
| Framing | `/services/framing` |
| Flooring | `/services/flooring` |
| Generac Generators | `/services/generac-generators` |
| Sidewalk Repairs | `/services/sidewalks` |
| Kitchen Remodeling | `/services/kitchen-remodeling` |
| Bathroom Remodeling | `/services/bathroom-remodeling` |
| Sheetrock & Painting | `/services/sheetrock-painting` |
| Parapet Wall Repair & Rebuild | `/services/parapet-wall-repair-rebuild` |
| Concrete Leveling | `/services/concrete-leveling` |
| Soil Stabilization | `/services/soil-stabilization` |
| Commercial Underpinning | `/services/commercial-underpinning` |
| Commercial Milling & Paving | `/services/commercial-milling-paving` |
| Commercial Parking Lot Maintenance | `/services/commercial-parking-lot-maintenance` |

### Blog Posts (8 pages)
| Post | Route |
|------|-------|
| 7 Best Home Additions in NYC | `/blog/best-home-additions-to-boost-value-of-property` |
| Sidewalk Liens & Violations in NYC | `/blog/what-you-need-to-know-about-sidewalk-liens-violations-in-nyc` |
| Benefits of Driveway Sealcoating | `/blog/benefits-of-driveway-sealcoating` |
| Best Type of Roof for Your Home | `/blog/best-type-of-roof-for-your-home` |
| Stone, Brick, or Concrete Pavers | `/blog/should-i-use-stone-brick-or-concrete-pavers-for-my-patio` |
| How to Prevent Mold in Your Home | `/blog/how-to-prevent-mold-in-home` |
| Waterproofing a Commercial Roof | `/blog/benefits-of-waterproofing-a-commercial-roof` |
| Foundation Damage Causes | `/blog/top-causes-of-foundation-damage-in-commercial-buildings` |

### Area Pages (15 pages)
| Area | Route |
|------|-------|
| Whitestone, NY | `/areas-we-serve/whitestone-ny` |
| Little Neck, NY | `/areas-we-serve/little-neck-ny` |
| Flushing, NY | `/areas-we-serve/flushing-ny` |
| Bayside, NY | `/areas-we-serve/bayside-ny` |
| Bay Terrace, NY | `/areas-we-serve/bay-terrace-ny` |
| Astoria, NY | `/areas-we-serve/astoria-ny` |
| Auburndale, NY | `/areas-we-serve/auburndale-ny` |
| College Point, NY | `/areas-we-serve/college-point-ny` |
| Murray Hill, NY | `/areas-we-serve/murray-hill-ny` |
| Oakland Gardens, NY | `/areas-we-serve/oakland-gardens-ny` |
| Fresh Meadows, NY | `/areas-we-serve/fresh-meadows-ny` |
| North Hempstead, NY | `/areas-we-serve/north-hempstead-ny` |
| Franklin Square, NY | `/areas-we-serve/franklin-square-ny` |
| Plandome, NY | `/areas-we-serve/plandome-ny` |
| Douglaston, NY | `/areas-we-serve/douglaston-ny` |

---

## Admin Dashboard (12 pages)

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/admin` | Stats, quick actions, pro tips |
| Login | `/admin/login` | Email/password authentication |
| Reset Password | `/admin/reset-password` | Password recovery |
| AI Page Builder | `/admin/pages` | Claude-powered page generation |
| Blog Management | `/admin/blogs` | Create/edit blog posts with TipTap |
| Site Pages | `/admin/site-pages` | Edit static page content |
| Reviews | `/admin/reviews` | Manage testimonials/reviews |
| Gallery | `/admin/gallery` | Image management and uploads |
| Live Chat | `/admin/chat` | Customer chat admin interface |
| Users | `/admin/users` | Admin user management |
| Settings | `/admin/settings` | Company info, social, hours, SEO |

---

## API Routes (13 endpoints)

### Admin APIs
| Method | Route | Purpose |
|--------|-------|---------|
| GET/POST/PUT/DELETE | `/api/admin/pages` | Page CRUD |
| GET/POST/PUT/DELETE | `/api/admin/blogs` | Blog CRUD |
| GET/POST/PUT/DELETE | `/api/admin/reviews` | Review CRUD |
| GET/POST | `/api/admin/site-pages` | Static page content |
| GET/POST | `/api/admin/settings` | Site settings |
| GET/DELETE | `/api/admin/users` | User management |
| POST | `/api/admin/users/invite` | User invitation |
| POST | `/api/admin/generate-page` | AI page generation |
| POST | `/api/admin/generate-blog` | AI blog generation |

### Public APIs
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/contact` | Contact form (Resend) |
| GET/POST/DELETE | `/api/chat/session` | Chat session management |
| GET/POST | `/api/chat/messages` | Chat message management |

---

## SEO Assets

| Asset | File |
|-------|------|
| Sitemap | `app/sitemap.ts` (auto-generated) |
| Robots | `app/robots.ts` |
| OG Image | `app/opengraph-image.tsx` (dynamic) |
| JSON-LD | On every page (LocalBusiness, Service, FAQ, BlogPosting, etc.) |

---

## Redirects (next.config.js)

| From | To |
|------|----|
| `/services/roofing` | `/services/roofing-services` |
| `/services/masonry` | `/services/masonry-brick-pointing` |
| `/services/home-additions` | `/services/home-additions-extensions` |
| `/services/foundation-repair` | `/services/foundation-repair-restoration` |
| `/services/water-mold-restoration` | `/services/water-and-mold-restoration` |
| `/services/generators` | `/services/generac-generators` |
| `/services/asphalt-sealcoating` | `/services/asphalt/sealcoating` |
| `/contact` | `/contact-us` |

---

## Component Library (28 components)

### Layout
- `Navbar` — Mega menu, mobile panel, active links, theme toggle
- `Footer` — 4-column, dark navy, partners carousel
- `BackToTop` — Floating scroll-to-top button
- `ScrollProgress` — Top progress bar
- `ScrollReveal` — Scroll-triggered animations

### Sections
- `Hero` — Blueprint grid bg, parallax, trust badges
- `Stats` — Animated counters with IntersectionObserver
- `Services` — 3-category service card grid
- `WhyUs` — 6 pillar cards + residential/commercial callouts
- `ServiceAreas` — Interactive SVG map + area grid
- `ContactCTA` — Blue bg CTA section with contact card
- `TrustBadges` — Horizontal badge strip
- `Testimonials` — 6-review auto-rotating carousel
- `SectionDivider` — Wave/gradient/angle/dots variants

### Interactive
- `QuoteForm` — Full + compact variants, Resend integration
- `FAQ` — Accordion with CSS grid animation
- `BeforeAfter` — Draggable image comparison slider
- `FloatingContact` — Expandable phone/email/quote FAB
- `ChatWidget` — Visitor live chat interface
- `ChatWrapper` — Conditional chat rendering

### Utility
- `JsonLd` — Structured data script renderer
- `Breadcrumb` — Reusable nav breadcrumbs
- `Skeleton` — Loading placeholders (text, image, card)
- `CookieConsent` — GDPR consent banner
- `SocialProof` — Notification popups
- `ThemeToggle` — Dark/light mode switch
- `PartnersCarousel` — CSS infinite scroll

### Admin
- `RichTextEditor` — TipTap editor with toolbar
