import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";

// GET - List all admin users
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const users = data.users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.user_metadata?.role || 'admin',
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));
    return NextResponse.json({ users });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a user
export async function DELETE(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
