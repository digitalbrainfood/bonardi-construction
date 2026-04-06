import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// GET - List all chat sessions
export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*, chat_messages(id)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const sessions = (data || []).map((session) => ({
      ...session,
      messageCount: session.chat_messages?.length || 0,
      chat_messages: undefined,
    }));

    return NextResponse.json(sessions);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch sessions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Create new chat session
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { name, phone, email } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      );
    }

    const sessionId = crypto.randomUUID();
    const userAgent = request.headers.get('user-agent') || '';

    const { data: session, error } = await supabase
      .from('chat_sessions')
      .insert({
        id: sessionId,
        name,
        phone,
        email,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // Add welcome message
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      text: `Hi ${name}! Thanks for reaching out to Bonardi Construction. A team member will be with you shortly. In the meantime, feel free to describe how we can help you.`,
      sender: 'system',
      created_at: new Date().toISOString(),
    });

    // Send email notification to admin via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Bonardi Construction <onboarding@resend.dev>',
          to: process.env.ADMIN_EMAIL,
          subject: 'New Chat Started - Bonardi Construction',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0055A5; padding: 20px; text-align: center;">
                <h1 style="color: #FBB62E; margin: 0;">New Chat Started</h1>
              </div>
              <div style="padding: 20px; background: #f9fafb;">
                <h2 style="color: #0055A5;">Customer Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p style="margin-top: 20px;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bonardiconstruction.com'}/admin/chat"
                     style="background: #0055A5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
                    View Chat
                  </a>
                </p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
    }

    return NextResponse.json(session, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete chat session
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Delete messages first (due to foreign key)
    await supabase
      .from('chat_messages')
      .delete()
      .eq('session_id', sessionId);

    // Delete session
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
