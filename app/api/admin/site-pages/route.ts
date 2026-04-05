import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Supabase when ready
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// GET - Get site page content by slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // TODO: Fetch from Supabase
      // const { data, error } = await supabase
      //   .from('static_pages')
      //   .select('*')
      //   .eq('slug', slug)
      //   .single();
      // if (error && error.code !== 'PGRST116') throw error;

      return NextResponse.json({
        slug,
        content: {},
        hasCustomContent: false,
      });
    }

    // List all static pages
    // TODO: Fetch from Supabase
    // const { data, error } = await supabase
    //   .from('static_pages')
    //   .select('*')
    //   .order('slug');
    // if (error) throw error;
    // return NextResponse.json(data || []);

    return NextResponse.json([]);
  } catch (error: unknown) {
    console.error("Fetch site page error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Save site page content
export async function POST(request: NextRequest) {
  try {
    const { slug, content } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    // TODO: Upsert into Supabase
    // const { data, error } = await supabase
    //   .from('static_pages')
    //   .upsert({
    //     slug,
    //     content,
    //     updated_at: new Date().toISOString(),
    //   }, {
    //     onConflict: 'slug',
    //   })
    //   .select()
    //   .single();
    // if (error) throw error;
    // return NextResponse.json(data);

    return NextResponse.json({
      slug,
      content,
      updated_at: new Date().toISOString(),
      success: true,
    });
  } catch (error: unknown) {
    console.error("Save site page error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save page";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
