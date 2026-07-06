import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";

const VALID_STATUSES = ["new", "contacted", "closed"] as const;

// GET - List all leads (newest first)
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error("Fetch leads error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch leads";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT - Update a lead's status
export async function PUT(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Status must be one of: new, contacted, closed" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Update lead error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update lead";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete a lead
export async function DELETE(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete lead error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete lead";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
