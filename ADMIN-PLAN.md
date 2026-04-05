# Admin Dashboard Implementation Plan — Bonardi Construction

## Reference: Lucky Stars Roofing (C:\Users\PC\lucky-stars)
Uniform admin dashboard pattern shared across client sites.

---

## Architecture Overview

### Tech Stack (matching lucky-stars)
- Next.js 14 App Router + TypeScript
- Supabase (auth, database, storage) — **stub only, no wiring yet**
- Claude AI (Anthropic SDK) for page builder — **stub only, API key later**
- Resend for chat notifications (already integrated)
- Lucide React for icons
- TipTap for rich text editing
- Tailwind CSS with admin-specific dark theme

### Brand Adaptation
Lucky Stars uses navy/purple/gold. Bonardi uses:
- `bg-gray-900` — admin background (same)
- `brand` (#0055A5) — replaces purple as primary action color
- `accent` (#FBB62E) — replaces gold as accent/highlight
- `white/5`, `white/10`, `white/20` — subtle backgrounds/borders (same pattern)

---

## File Structure to Create

```
app/
  admin/
    layout.tsx              — Sidebar nav, auth check stub, mobile toggle
    page.tsx                — Dashboard stats & quick actions
    login/page.tsx          — Auth login form (Supabase stub)
    reset-password/page.tsx — Password reset (Supabase stub)
    pages/page.tsx          — AI Page Builder
    blogs/page.tsx          — Blog management (CRUD)
    site-pages/page.tsx     — Static pages editor
    reviews/page.tsx        — Review management
    chat/page.tsx           — Live chat admin interface
    users/page.tsx          — Admin user management
    gallery/page.tsx        — Image gallery management
    settings/page.tsx       — Site settings

  api/
    admin/
      pages/route.ts        — CRUD for generated pages (Supabase stub)
      blogs/route.ts        — CRUD for blog posts (Supabase stub)
      reviews/route.ts      — CRUD for reviews (Supabase stub)
      site-pages/route.ts   — CRUD for static pages (Supabase stub)
      settings/route.ts     — Site settings (Supabase stub)
      users/route.ts        — User management (Supabase stub)
      users/invite/route.ts — User invitation (Supabase stub)
      generate-page/route.ts — Claude AI page generation (stub)
      generate-blog/route.ts — Claude AI blog generation (stub)
    chat/
      session/route.ts      — Chat session CRUD (Supabase stub)
      messages/route.ts     — Chat message CRUD (Supabase stub)

components/
  admin/
    rich-text-editor.tsx    — TipTap editor wrapper
  chat/
    chat-widget.tsx         — Visitor-side chat widget (bottom-right)
    chat-wrapper.tsx        — Conditional render (hide on /admin)
    index.ts                — Barrel export

lib/
  supabase/
    client.ts               — Browser client (stub)
    server.ts               — Server client (stub)
    middleware.ts            — Auth middleware helper (stub)

middleware.ts               — Auth route protection (stub)
```

---

## Phase 1: Admin Layout & Dashboard

### admin/layout.tsx
- Fixed sidebar (w-64) with Bonardi logo
- Navigation items with Lucide icons:
  1. Dashboard (LayoutDashboard)
  2. Pages (FileText) — AI Page Builder
  3. Blog Posts (BookOpen)
  4. Site Pages (Edit3)
  5. Reviews (Star)
  6. Gallery (Image)
  7. Live Chat (MessageSquare)
  8. Users (Users)
  9. Settings (Settings)
- Mobile hamburger toggle
- "View Site" link in top bar
- Sign out button
- Auth check stub (commented Supabase call)
- Dark theme: bg-gray-900, brand/accent colors

### admin/page.tsx (Dashboard)
- Stats cards: Pages, Blog Posts, Reviews, Active Chats
- Quick Actions grid linking to each section
- Pro Tips section
- All using stub data (no Supabase yet)

### admin/login/page.tsx
- Email + password form
- "Forgot password?" link
- Bonardi logo
- Stub submit handler (no Supabase yet)

---

## Phase 2: AI Page Builder

### admin/pages/page.tsx
Match lucky-stars pattern exactly:
- Service name input → Claude AI generates full page JSON
- Generated structure:
  - Hero (title, highlight, description, CTAs, background image)
  - Intro section
  - Services (4 items with icons, descriptions, images)
  - Benefits (6 items)
  - Process (4 steps)
  - FAQ (3 items)
  - CTA section
  - SEO metadata
- Collapsible section editors for each block
- Preview toggle
- Save/Publish controls
- Page list with search/filter

### api/admin/generate-page/route.ts
- Claude API call (claude-sonnet-4-20250514)
- System prompt with Bonardi Construction details:
  - Company: Bonardi Construction, Inc.
  - Location: Queens, NY
  - Services: all 35 services from services-data.ts
  - Image pool: Unsplash URLs from lib/images.ts
  - Brand: blue (#0055A5), yellow (#FBB62E)
- Returns JSON matching GeneratedPageData interface
- Stub until API key provided

---

## Phase 3: Blog Management

### admin/blogs/page.tsx
- Blog post list with status (draft/published)
- Create/Edit form:
  - Title, slug (auto-generated), excerpt
  - Rich text editor (TipTap) for content
  - Featured image upload/URL
  - Category, tags
  - SEO fields (meta title, description)
  - Publish/Draft toggle
- AI blog generation via Claude (stub)
- Integration with existing lib/blog-data.ts posts

### api/admin/blogs/route.ts
- GET: list all posts
- POST: create new post
- PUT: update post
- DELETE: delete post
- Supabase stubs

---

## Phase 4: Live Chat

### Visitor Widget (components/chat/)
Match lucky-stars exactly:
1. Floating button (bottom-right, brand blue)
2. Info form: name, phone, email
3. Chat interface with polling (3s)
4. Session persistence via localStorage
5. Welcome message on session start
6. End chat with confirmation
7. navigator.sendBeacon for page unload

### Admin Chat (admin/chat/page.tsx)
Match lucky-stars exactly:
1. Two-column: session list (w-80) + chat view
2. Sessions sorted by recency with message counts
3. Color-coded messages (user=light, admin=brand, system=accent)
4. Sound notification toggle
5. Delete session capability
6. 3-second polling

### Chat API (api/chat/)
- session/route.ts: GET (list), POST (create), DELETE
- messages/route.ts: GET (by session), POST (send)
- Supabase stubs

---

## Phase 5: Supporting Pages

### admin/reviews/page.tsx
- Review list with star ratings
- Add/Edit review form (name, location, rating, text, service, featured toggle)
- Feeds into Testimonials component

### admin/gallery/page.tsx
- Image grid with upload capability
- Categorize images by project type
- Replace Unsplash placeholders with real photos

### admin/site-pages/page.tsx
- Edit existing static pages (About, Contact, etc.)
- Rich text content editing
- SEO field editing

### admin/users/page.tsx
- List admin users
- Invite new users via email
- Role management

### admin/settings/page.tsx
- Company info (name, phone, email, address)
- Social links
- Business hours
- License numbers
- SEO defaults

---

## Phase 6: Supabase Stubs

### lib/supabase/client.ts
```typescript
// Stub: createBrowserClient with placeholder URL/key
// Will be connected when Supabase project is created
```

### lib/supabase/server.ts
```typescript
// Stub: createServerClient with placeholder URL/key
```

### middleware.ts
```typescript
// Stub: Check for admin routes, redirect if no session
// Currently allows all access for development
```

### Database Schema (for reference, not created yet)
```sql
-- Same tables as lucky-stars:
-- chat_sessions, chat_messages, pages, blogs, reviews, settings
-- Plus: gallery (for image management)
```

---

## Dependencies to Install
```
@anthropic-ai/sdk      — Claude AI (page builder)
@supabase/supabase-js  — Database/Auth
@supabase/ssr          — SSR helpers
@tiptap/react          — Rich text editor
@tiptap/starter-kit    — Editor extensions
@tiptap/extension-link — Link support
@tiptap/extension-image — Image support
@tiptap/extension-placeholder — Placeholder text
lucide-react           — Icons
marked                 — Markdown to HTML
```

---

## Key Differences from Lucky Stars
1. **Brand colors**: blue/yellow instead of purple/gold
2. **Service data**: 35 construction services (from services-data.ts)
3. **Image pool**: Construction images (from lib/images.ts)
4. **Existing blog data**: 8 real posts already in lib/blog-data.ts
5. **Existing reviews**: 6 testimonials in Testimonials component
6. **Company details**: Bonardi Construction specific info

## Uniform Patterns to Maintain
1. Same sidebar layout and navigation structure
2. Same page builder JSON structure and Claude prompt pattern
3. Same chat widget/admin interface
4. Same Supabase client setup pattern
5. Same API route patterns (GET/POST/PUT/DELETE)
6. Same component styling (bg-white/5, border-white/10, etc.)
7. Same auth flow (Supabase middleware)
8. Same rich text editor (TipTap)
