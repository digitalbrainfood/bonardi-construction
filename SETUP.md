# Bonardi Construction — Setup & Deployment Guide

## Quick Start (Development)

```bash
npm install
npm run dev
# Site: http://localhost:3000
# Admin: http://localhost:3000/admin
```

---

## Environment Variables

Create `.env.local` in the project root:

```env
# ── Supabase (required for production) ──
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ── Anthropic Claude AI (required for page builder & blog generator) ──
ANTHROPIC_API_KEY=your-anthropic-api-key

# ── Resend (already configured for contact form) ──
RESEND_API_KEY=re_VPduNmjy_NuK9KnXobB9ftbusXD2XpS2o

# ── Admin email (receives chat notifications) ──
ADMIN_EMAIL=Info@bonardiconst.com

# ── Site URL ──
NEXT_PUBLIC_SITE_URL=https://bonardiconst.com
```

---

## Connecting Supabase

### 1. Create Supabase Project
- Go to https://supabase.com/dashboard
- Create new project
- Copy the URL, anon key, and service role key into `.env.local`

### 2. Create Database Tables

Run this SQL in the Supabase SQL Editor:

```sql
-- Chat sessions
CREATE TABLE chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Chat messages
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'admin', 'system')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Generated pages (page builder)
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author TEXT DEFAULT 'Gary M. Bonelli',
  category TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  seo JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews / Testimonials
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  service TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site settings
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery images
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site pages (static page content)
CREATE TABLE site_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  seo JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

-- Public read policies (visitors can read published content)
CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read published blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read site pages" ON site_pages FOR SELECT USING (true);

-- Chat policies (visitors can create sessions and messages)
CREATE POLICY "Anyone can create chat sessions" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read their chat session" ON chat_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can create chat messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read chat messages" ON chat_messages FOR SELECT USING (true);

-- Admin policies (authenticated users have full access)
CREATE POLICY "Admins full access pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access site_pages" ON site_pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access chat_sessions" ON chat_sessions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access chat_messages" ON chat_messages FOR ALL USING (auth.role() = 'authenticated');
```

### 3. Create First Admin User
- Go to Supabase Dashboard → Authentication → Users
- Click "Add User" → enter email and password
- This will be the first admin login for `/admin/login`

### 4. Set Up Storage (for image uploads)
- Go to Supabase Dashboard → Storage
- Create a bucket called `gallery` (public)
- This enables image uploads in the admin gallery

### 5. Activate Auth in Code

**File: `lib/supabase/middleware.ts`**
- Uncomment the Supabase auth session check code (marked with TODO)

**File: `app/admin/layout.tsx`**
- Uncomment the Supabase auth check in the layout (marked with TODO)

**File: `app/admin/login/page.tsx`**
- Uncomment the Supabase signInWithPassword call (marked with TODO)

### 6. Activate API Routes

Each API route file in `app/api/admin/*/route.ts` has Supabase queries commented out with `// TODO: Supabase`. Uncomment those blocks and remove the stub responses.

Same for `app/api/chat/*/route.ts`.

---

## Connecting Claude AI (Page Builder & Blog Generator)

### 1. Add API Key
Add `ANTHROPIC_API_KEY` to `.env.local`

### 2. Activate Page Builder
**File: `app/api/admin/generate-page/route.ts`**
- Uncomment the Anthropic SDK import and API call
- Remove the hardcoded stub response

### 3. Activate Blog Generator
**File: `app/api/admin/generate-blog/route.ts`**
- Same — uncomment the Anthropic SDK call, remove stub

---

## Custom Domain Email (Resend)

Currently using `onboarding@resend.dev` as the sender. To use a custom domain:

1. Go to https://resend.com/domains
2. Add `bonardiconst.com` and verify DNS records
3. Update `app/api/contact/route.ts` line 18:
   ```typescript
   from: "Bonardi Construction <noreply@bonardiconst.com>",
   ```

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - All variables from .env.local above
# - Make sure to add them in the Vercel project settings
```

Or connect the GitHub repo directly at https://vercel.com/new.

### Important Vercel Settings
- **Framework:** Next.js (auto-detected)
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Node.js Version:** 18.x or 20.x

---

## Replacing Placeholder Images

All placeholder images are Unsplash URLs centralized in `lib/images.ts`. To replace with real project photos:

1. Upload photos to Supabase Storage (gallery bucket) or your CDN
2. Update the URLs in `lib/images.ts`
3. Or use the admin Gallery page to manage images once Supabase is connected

---

## Tech Stack Summary

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Auth, database, storage |
| Anthropic Claude | AI page/blog generation |
| Resend | Email delivery (contact form, chat notifications) |
| TipTap | Rich text editor (admin) |
| Lucide React | Icons |
| Unsplash | Placeholder images |
