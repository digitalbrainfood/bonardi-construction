import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET - List all pages or get single page by slug
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (id) {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    }

    if (slug) {
      const preview = searchParams.get('preview') === 'true';
      const query = supabase.from('pages').select('*').eq('slug', slug);
      if (!preview) query.eq('status', 'published');
      const { data, error } = await query.single();
      if (error) throw error;
      return NextResponse.json(data);
    }

    // List all pages
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error('Fetch pages error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to fetch pages';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new page
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { slug, title, status = 'draft', data = {} } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'Slug and title are required' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', slug)
      .single();
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    const { data: page, error } = await supabase
      .from('pages')
      .insert({
        id: crypto.randomUUID(),
        slug,
        title,
        status,
        data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(page, { status: 201 });
  } catch (error: unknown) {
    console.error('Create page error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to create page';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update page
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { id, slug, title, status, data } = body;

    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    if (slug) {
      const { data: existing } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single();
      if (existing) {
        return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
      }
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (slug !== undefined) updateData.slug = slug;
    if (title !== undefined) updateData.title = title;
    if (status !== undefined) updateData.status = status;
    if (data !== undefined) updateData.data = data;

    const { data: page, error } = await supabase
      .from('pages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(page);
  } catch (error: unknown) {
    console.error('Update page error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to update page';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete page
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete page error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to delete page';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
