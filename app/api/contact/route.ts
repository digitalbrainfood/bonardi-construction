import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, address, message, type } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Bonardi Construction <onboarding@resend.dev>",
      to: "Info@bonardiconst.com",
      replyTo: email,
      subject: `New Quote Request — ${service || "General Inquiry"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0055A5; padding: 24px 32px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Quote Request</h1>
          </div>
          <div style="padding: 32px; background: #ffffff; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 140px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                  <a href="mailto:${email}" style="color: #0055A5;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; vertical-align: top;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">
                  <a href="tel:${phone}" style="color: #0055A5;">${phone}</a>
                </td>
              </tr>
              ${type ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; vertical-align: top;">Project Type</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; text-transform: capitalize;">${type}</td>
              </tr>` : ""}
              ${service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; vertical-align: top;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${service}</td>
              </tr>` : ""}
              ${address ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; vertical-align: top;">Address</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${address}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 12px 0; color: #6b7280; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #111827; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
              Sent from bonardiconst.com contact form
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
