import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-free anon client for reading public content in server components.
// Unlike lib/supabase/server.ts this doesn't touch cookies(), so pages using
// it stay statically renderable / ISR-compatible.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
