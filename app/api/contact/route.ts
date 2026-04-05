import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, address, message, type } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /**
     * TODO: Integrate with your email provider of choice.
     *
     * Option 1 — Resend (recommended):
     *   import { Resend } from 'resend';
     *   const resend = new Resend(process.env.RESEND_API_KEY);
     *   await resend.emails.send({
     *     from: 'noreply@bonardiconst.com',
     *     to: 'Info@bonardiconst.com',
     *     subject: `New Quote Request — ${service || 'General'}`,
     *     html: `<p>Name: ${name}</p>...`
     *   });
     *
     * Option 2 — Nodemailer / SMTP:
     *   Configure with your hosting provider's SMTP settings.
     *
     * Option 3 — SendGrid / Postmark / Mailgun
     */

    console.log("Quote request received:", { name, email, phone, service, address, message, type });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
