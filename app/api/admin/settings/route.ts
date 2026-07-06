import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";
import { defaultSettings } from "@/lib/settings";

// GET - Get site settings
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json(data || { id: 'default', data: defaultSettings });
  } catch (error: unknown) {
    console.error("Fetch settings error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Save site settings
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();
  try {
    const supabase = createServiceClient();
    const body = await request.json();

    // Check if settings row exists
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing) {
      const { data, error } = await supabase
        .from('settings')
        .update({
          data: body,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from('settings')
        .insert({
          data: body,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Save settings error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
