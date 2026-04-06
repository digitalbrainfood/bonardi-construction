import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET - List all blogs or get single blog by slug/id
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (id) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return NextResponse.json(data);
    }

    if (slug) {
      const preview = searchParams.get('preview') === 'true';
      const query = supabase.from('blogs').select('*').eq('slug', slug);
      if (!preview) query.eq('status', 'published');
      const { data, error } = await query.single();
      if (error) throw error;
      return NextResponse.json(data);
    }

    // List all blogs
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error('Fetch blogs error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to fetch blogs';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author = 'Bonardi Construction',
      category = 'Construction Tips',
      tags = [],
      status = 'draft',
      seo = {},
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single();
    if (existing) {
      return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 400 });
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title, slug, excerpt, content, featured_image, author, category, tags, status, seo,
        published_at: status === 'published' ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error('Create blog error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to create blog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update blog
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    if (updates.slug) {
      const { data: existing } = await supabase
        .from('blogs')
        .select('id')
        .eq('slug', updates.slug)
        .neq('id', id)
        .single();
      if (existing) {
        return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 400 });
      }
    }

    if (updates.status === 'published') {
      const { data: current } = await supabase
        .from('blogs')
        .select('published_at')
        .eq('id', id)
        .single();
      if (!current?.published_at) {
        updates.published_at = new Date().toISOString();
      }
    }

    updates.updated_at = new Date().toISOString();
    const { data: blog, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Update blog error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to update blog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete blog
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete blog error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to delete blog';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
