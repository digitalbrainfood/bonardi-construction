-- Bonardi Construction — idempotent database schema
-- Paste this whole file into the Supabase SQL Editor and run it.
-- Safe to run multiple times.

CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'admin', 'system')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blogs (
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

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  service TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  seo JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

-- Public read policies
DROP POLICY IF EXISTS "Public can read published pages" ON pages;
CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Public can read published blogs" ON blogs;
CREATE POLICY "Public can read published blogs" ON blogs FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Public can read reviews" ON reviews;
CREATE POLICY "Public can read reviews" ON reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can read settings" ON settings;
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public can read site pages" ON site_pages;
CREATE POLICY "Public can read site pages" ON site_pages FOR SELECT USING (true);

-- Chat policies
DROP POLICY IF EXISTS "Anyone can create chat sessions" ON chat_sessions;
CREATE POLICY "Anyone can create chat sessions" ON chat_sessions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can read their chat session" ON chat_sessions;
CREATE POLICY "Anyone can read their chat session" ON chat_sessions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can create chat messages" ON chat_messages;
CREATE POLICY "Anyone can create chat messages" ON chat_messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can read chat messages" ON chat_messages;
CREATE POLICY "Anyone can read chat messages" ON chat_messages FOR SELECT USING (true);

-- Admin (authenticated) policies
DROP POLICY IF EXISTS "Admins full access pages" ON pages;
CREATE POLICY "Admins full access pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access blogs" ON blogs;
CREATE POLICY "Admins full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access reviews" ON reviews;
CREATE POLICY "Admins full access reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access settings" ON settings;
CREATE POLICY "Admins full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access gallery" ON gallery;
CREATE POLICY "Admins full access gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access site_pages" ON site_pages;
CREATE POLICY "Admins full access site_pages" ON site_pages FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access chat_sessions" ON chat_sessions;
CREATE POLICY "Admins full access chat_sessions" ON chat_sessions FOR ALL USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admins full access chat_messages" ON chat_messages;
CREATE POLICY "Admins full access chat_messages" ON chat_messages FOR ALL USING (auth.role() = 'authenticated');

-- Leads (contact form submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service TEXT,
  project_type TEXT,
  address TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- No public policies: the contact form API writes with the service role.
DROP POLICY IF EXISTS "Admins full access leads" ON leads;
CREATE POLICY "Admins full access leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
