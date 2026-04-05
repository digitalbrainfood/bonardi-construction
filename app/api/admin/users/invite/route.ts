import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Supabase when ready
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

export async function POST(request: NextRequest) {
  try {
    const { email, role } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Invite via Supabase auth admin
    // const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bonardiconstruction.com';
    // const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    //   redirectTo: `${siteUrl.replace(/\/$/, '')}/admin/reset-password`,
    //   data: { role: role || 'editor' },
    // });
    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 400 });
    // }
    // return NextResponse.json({ success: true, user: data.user });

    return NextResponse.json({
      success: true,
      message: `Invitation would be sent to ${email} with role: ${role || "editor"}`,
      user: {
        id: String(Date.now()),
        email,
        role: role || "editor",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to invite user" },
      { status: 500 }
    );
  }
}
