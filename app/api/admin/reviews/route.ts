import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";

// GET - List all reviews
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error("Fetch reviews error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch reviews";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new review
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const { name, location, rating, text, service, featured = false } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Name and review text are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name,
        location,
        rating: rating || 5,
        text,
        service: service || 'General Construction',
        featured,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.error("Create review error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update review
export async function PUT(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Update review error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete review
export async function DELETE(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Review ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete review error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
