# High-End UX/UI Improvement Plan — Bonardi Construction

## Phase 1 — Critical (Do First)

### 1. Premium Mega Menu Redesign
**File:** `components/Navbar.tsx`
- 4-column layout: 3 service columns + featured project column
- Category hero images at top of each column with gradient overlay
- Per-service descriptions for top items, "Popular" badges
- Hover preview: service image changes dynamically in featured column
- Staggered entrance animations per column (60ms delay each)
- Gradient top border (brand → accent), frosted glass panel (`bg-white/95 backdrop-blur-lg`)
- Mobile: category images in accordion headers

### 2. ScrollReveal Component
**New file:** `components/ScrollReveal.tsx` + `hooks/useScrollReveal.ts`
- IntersectionObserver-based scroll-triggered animations
- Variants: fade-up, fade-in, slide-left, slide-right, scale-in
- Props: animation, delay, threshold, once
- Apply to: Services, WhyUs, ServiceAreas, ContactCTA, About, Services page, Gallery, Blog

### 3. Page Transition Animation
**New file:** `app/template.tsx`
- Subtle fade-up entrance on every route change
- Uses Next.js template.tsx (re-mounts on navigation)

---

## Phase 2 — High Priority

### 4. Back to Top Button
**New file:** `components/BackToTop.tsx`
- Appears after 400px scroll, fixed bottom-right
- Animated entrance, smooth scroll to top

### 5. Scroll Progress Indicator
**New file:** `components/ScrollProgress.tsx`
- 3px gradient bar at top of viewport (brand → accent)
- Width = scroll percentage

### 6. Floating Contact Widget
**New file:** `components/FloatingContact.tsx`
- Fixed FAB, expands to show phone/email/quote links
- Pulse animation, hides when footer visible

### 7. Skeleton Loaders
**New files:** `components/Skeleton.tsx`, `app/services/[slug]/loading.tsx`, `app/gallery/loading.tsx`, `app/blog/loading.tsx`
- Composable skeleton components (text, image, card)
- Shimmer animation using existing keyframe

### 8. Testimonials Section
**New files:** `components/Testimonials.tsx`, `lib/testimonials-data.ts`
- 3-card carousel with auto-rotate
- Quote, client name, project type, stars, location
- Place on homepage between WhyUs and ServiceAreas

---

## Phase 3 — Medium Priority

### 9. Section Dividers
**New file:** `components/SectionDivider.tsx`
- Variants: gradient, wave (SVG), angle, dots
- Replace plain borders between homepage sections

### 10. Breadcrumb Component (Reusable)
**New file:** `components/Breadcrumb.tsx`
- Extract inline breadcrumb pattern into reusable component
- Include JSON-LD BreadcrumbList schema

### 11. FAQ Accordion Component
**New file:** `components/FAQ.tsx`
- Smooth height animation (grid-template-rows technique)
- Plus/minus icon rotation
- JSON-LD FAQPage schema
- Add FAQ data to `lib/services-data.ts` and `lib/areas-data.ts`

### 12. Before/After Image Slider
**New file:** `components/BeforeAfter.tsx`
- Draggable divider, CSS clip-path, touch-enabled

### 13. Interactive Service Area Map
**Modify:** `components/ServiceAreas.tsx`
- Custom SVG map of NYC/Long Island with clickable zones
- Hover highlights, tooltip, navigate to area pages

### 14. Trust Badges Section
**New file:** `components/TrustBadges.tsx`
- Horizontal strip: 30+ Years, Licensed, Lead-Safe, 500+ Projects, Free Estimates
- Place between Hero and Stats

### 15. Image Hover Zoom (remaining pages)
- Add `hover:scale-105 transition-transform duration-700` to service detail images, about page photo

### 16. Mobile Optimizations
- `touch-action: manipulation`, 44px min tap targets
- Simplify hero background on mobile

### 17. Lightbox Enhancement
**Modify:** `app/gallery/page.tsx`
- Prev/next arrows, keyboard nav, swipe gestures, image counter, entrance animation

### 18. Micro-interactions Polish
- `hover:scale-[1.02] active:scale-[0.98]` on CTA buttons
- `focus:shadow-brand/10` on form fields
- `hover:scale-110` on social icons

---

## Phase 4 — Nice to Have

### 19. Cookie Consent Banner
**New file:** `components/CookieConsent.tsx`

### 20. Newsletter Signup
**New file:** `components/Newsletter.tsx` — add to footer

### 21. Partners Logo Carousel
**New file:** `components/PartnersCarousel.tsx` — CSS-only infinite scroll

### 22. Video Hero Background
**Modify:** `components/Hero.tsx` — optional `<video>` element

### 23. Dark Mode
- Add `darkMode: 'class'` to tailwind, `ThemeToggle.tsx`, dark variants everywhere

### 24. Print Stylesheet
**Modify:** `app/globals.css` — `@media print` rules

### 25. Social Proof Indicators
**New file:** `components/SocialProof.tsx` — floating notification popups

### 26. Parallax Effects
**Modify:** `components/Hero.tsx`, `components/Stats.tsx` — requestAnimationFrame parallax

### 27. Enhanced Card Shadows
**Modify:** `tailwind.config.js` — `shadow-card-active`, `will-change` utilities

---

## Notes
- No external animation libraries needed — pure CSS + IntersectionObserver
- All animations must respect `prefers-reduced-motion`
- Images from `lib/images.ts` (Unsplash placeholders, swap with real photos later)
- Performance: disconnect observers after trigger, RAF throttling for scroll effects
