import { NextRequest, NextResponse } from "next/server";
import {
  getAdminUser,
  unauthorized,
  createServiceClient,
} from "@/lib/supabase/api-auth";

const BUCKET = "gallery";

// GET - List gallery images (newest first)
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: unknown) {
    console.error("Fetch gallery error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch gallery images";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Upload an image to storage and create a gallery row
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const category = formData.get("category");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "An image file is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const sanitized = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const path = `${Date.now()}-${sanitized}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadOptions = {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    };

    let { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, buffer, uploadOptions);

    // If the bucket doesn't exist yet, create it (public) and retry once.
    if (uploadError && /bucket/i.test(uploadError.message || "")) {
      const { error: bucketError } = await supabase.storage.createBucket(
        BUCKET,
        { public: true }
      );
      if (bucketError) throw bucketError;
      ({ error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, uploadOptions));
    }
    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    const { data, error } = await supabase
      .from("gallery")
      .insert({
        title: typeof title === "string" && title.trim() ? title.trim() : file.name,
        url: publicUrl,
        category: typeof category === "string" && category ? category : null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    console.error("Upload gallery image error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Remove a gallery row (and its storage object, best-effort)
export async function DELETE(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) return unauthorized();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { data: row, error: fetchError } = await supabase
      .from("gallery")
      .select("*")
      .eq("id", id)
      .single();
    if (fetchError) throw fetchError;
    if (!row) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const { error: deleteError } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);
    if (deleteError) throw deleteError;

    // Best-effort storage cleanup — never fail the request over this.
    if (typeof row.url === "string" && row.url.includes(`/${BUCKET}/`)) {
      try {
        const rawPath = row.url.split(`/${BUCKET}/`).pop() || "";
        const path = decodeURIComponent(rawPath.split("?")[0]);
        if (path) {
          await supabase.storage.from(BUCKET).remove([path]);
        }
      } catch (storageError) {
        console.error("Gallery storage cleanup failed:", storageError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Delete gallery image error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
