import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";

// GET - Get site page content by slug
export async function GET(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        return NextResponse.json({
          slug,
          content: {},
          hasCustomContent: false,
        });
      }

      return NextResponse.json({ ...data, hasCustomContent: true });
    }

    // List all site pages
    const { data, error } = await supabase
      .from('site_pages')
      .select('*')
      .order('slug');
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error("Fetch site page error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Save site page content
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { slug, title, content, seo } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('site_pages')
      .upsert({
        slug,
        title: title || slug,
        content: content || {},
        seo: seo || {},
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'slug',
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Save site page error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
