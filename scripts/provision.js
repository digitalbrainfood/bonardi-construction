/**
 * Bonardi Construction — Supabase provisioning script.
 *
 * Usage:  node scripts/provision.js
 *
 * What it does (all idempotent):
 *   1. Verifies the Supabase project in .env.local is reachable.
 *   2. Reports which database tables are missing (create them by pasting
 *      scripts/schema.sql into the Supabase SQL Editor).
 *   3. Creates the public "gallery" storage bucket if missing.
 *   4. Creates the admin test login if missing:
 *        email:    admin@bonardiconst.com
 *        password: Bonardi2026!Test
 *      (override with ADMIN_TEST_EMAIL / ADMIN_TEST_PASSWORD env vars)
 *   5. Seeds the reviews table with the site's six testimonials if empty.
 */

const fs = require("fs");
const path = require("path");
const dns = require("dns").promises;

// ── load .env.local ──
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.ADMIN_TEST_EMAIL || "admin@bonardiconst.com";
const ADMIN_PASSWORD = process.env.ADMIN_TEST_PASSWORD || "Bonardi2026!Test";

if (!URL_ || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(URL_, SERVICE_KEY);

const TABLES = [
  "pages", "blogs", "reviews", "settings", "site_pages",
  "chat_sessions", "chat_messages", "gallery", "leads",
];

const SEED_REVIEWS = [
  { name: "Maria S.", location: "Bayside, NY", rating: 5, service: "Hardscaping", featured: true, text: "Bonardi Construction transformed our backyard into a stunning outdoor living space. The stone patio and retaining walls exceeded our expectations. Their attention to detail is unmatched." },
  { name: "Robert K.", location: "Flushing, NY", rating: 5, service: "Fire Restoration", featured: true, text: "After our house fire, they handled everything from demolition to rebuild. Their team was compassionate, professional, and delivered our home back better than before. We are forever grateful." },
  { name: "James & Linda P.", location: "Garden City, NY", rating: 5, service: "Roofing", featured: true, text: "Best roofing contractor we've used in over 20 years. They replaced our entire roof in two days, cleaned up perfectly, and the price was very fair. Highly recommend to anyone on Long Island." },
  { name: "David M.", location: "Nassau County", rating: 5, service: "Asphalt Paving", featured: true, text: "They repaved our entire commercial parking lot over a weekend to minimize business disruption. The asphalt work is flawless and has held up beautifully through two harsh winters already." },
  { name: "Sarah T.", location: "Queens, NY", rating: 5, service: "Foundation Repair", featured: true, text: "Foundation issues had us worried we'd lose our home. Bonardi's team assessed the damage quickly, explained every step, and completed the repair on time and on budget. True professionals." },
  { name: "Michael R.", location: "Suffolk County", rating: 5, service: "New Construction", featured: true, text: "Professional from start to finish. Our new construction project was completed on schedule with exceptional craftsmanship. Gary personally oversaw every phase. We couldn't be happier." },
];

(async () => {
  const host = new URL(URL_).hostname;

  // 1. reachability
  try {
    await dns.lookup(host);
  } catch {
    console.error(`
✗ The Supabase project at ${URL_} does not resolve (NXDOMAIN).

  This usually means the project was PAUSED (free tier pauses after ~1 week
  of inactivity) or deleted. To fix:

  1. Go to https://supabase.com/dashboard and sign in.
  2. If the project is paused: open it and click "Restore project", wait a
     few minutes, then re-run:  node scripts/provision.js
  3. If it was deleted: create a new project, then update .env.local with
     the new NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and
     SUPABASE_SERVICE_ROLE_KEY, paste scripts/schema.sql into the SQL
     Editor, and re-run this script.
`);
    process.exit(2);
  }
  console.log(`✓ ${host} resolves`);

  // 2. tables
  const missing = [];
  for (const t of TABLES) {
    const { error } = await supabase.from(t).select("*", { count: "exact", head: true });
    if (error) {
      missing.push(t);
      console.log(`✗ table ${t}: ${error.message}`);
    } else {
      console.log(`✓ table ${t}`);
    }
  }
  if (missing.length) {
    console.log(`
Tables missing: ${missing.join(", ")}
→ Open the Supabase SQL Editor and run the contents of scripts/schema.sql,
  then re-run this script.
`);
  }

  // 3. storage bucket
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!(buckets || []).some((b) => b.name === "gallery")) {
    const { error } = await supabase.storage.createBucket("gallery", { public: true });
    console.log(error ? `✗ create bucket gallery: ${error.message}` : "✓ created public bucket: gallery");
  } else {
    console.log("✓ bucket gallery exists");
  }

  // 4. admin user
  const { data: usersData, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) {
    console.log(`✗ list users: ${listErr.message}`);
  } else {
    const existing = usersData.users.find(
      (u) => (u.email || "").toLowerCase() === ADMIN_EMAIL.toLowerCase()
    );
    if (existing) {
      // make sure the known test password works
      const { error } = await supabase.auth.admin.updateUserById(existing.id, {
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      console.log(error ? `✗ update admin user: ${error.message}` : `✓ admin user exists — password reset to the test password`);
    } else {
      const { error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      console.log(error ? `✗ create admin user: ${error.message}` : `✓ created admin user`);
    }
    console.log(`  → login at /admin/login with ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  // 5. seed reviews
  if (!missing.includes("reviews")) {
    const { count } = await supabase.from("reviews").select("*", { count: "exact", head: true });
    if ((count ?? 0) === 0) {
      const { error } = await supabase.from("reviews").insert(SEED_REVIEWS);
      console.log(error ? `✗ seed reviews: ${error.message}` : `✓ seeded ${SEED_REVIEWS.length} reviews`);
    } else {
      console.log(`✓ reviews table already has ${count} rows`);
    }
  }

  console.log("\nDone.");
})();
