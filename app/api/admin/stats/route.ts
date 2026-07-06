import { NextResponse } from "next/server";
import { getAdminUser, unauthorized, createServiceClient } from "@/lib/supabase/api-auth";

// GET - Dashboard stats (row counts per table)
export async function GET() {
  const user = await getAdminUser();
  if (!user) return unauthorized();

  try {
    const supabase = createServiceClient();

    // Count a table's rows; return null on any error so a dead backend
    // degrades to "—" in the dashboard instead of crashing.
    const countTable = async (table: string): Promise<number | null> => {
      try {
        const { count, error } = await supabase
          .from(table)
          .select("*", { count: "exact", head: true });
        if (error) return null;
        return count ?? 0;
      } catch {
        return null;
      }
    };

    const [pages, blogs, reviews, chats] = await Promise.all([
      countTable("pages"),
      countTable("blogs"),
      countTable("reviews"),
      countTable("chat_sessions"),
    ]);

    return NextResponse.json({ pages, blogs, reviews, chats });
  } catch (error: unknown) {
    console.error("Fetch stats error:", error);
    return NextResponse.json({
      pages: null,
      blogs: null,
      reviews: null,
      chats: null,
    });
  }
}
