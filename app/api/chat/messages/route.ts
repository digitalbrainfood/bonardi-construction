import { NextRequest, NextResponse } from 'next/server';

// TODO: Connect to Supabase
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// GET - Get messages for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // TODO: Supabase query
    // let query = supabase
    //   .from('chat_messages')
    //   .select('*')
    //   .eq('session_id', sessionId)
    //   .order('created_at', { ascending: true });
    //
    // const afterId = searchParams.get('afterId');
    // if (afterId) {
    //   const { data: afterMessage } = await supabase
    //     .from('chat_messages')
    //     .select('created_at')
    //     .eq('id', afterId)
    //     .single();
    //
    //   if (afterMessage) {
    //     query = query.gt('created_at', afterMessage.created_at);
    //   }
    // }
    //
    // const { data, error } = await query;
    // if (error) throw error;
    // return NextResponse.json(data || []);

    return NextResponse.json([]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch messages';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Send a message
export async function POST(request: NextRequest) {
  try {
    // Handle both JSON and text/plain (from sendBeacon)
    const contentType = request.headers.get('content-type') || '';
    let body;
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      // sendBeacon sends as text/plain
      const text = await request.text();
      body = JSON.parse(text);
    }
    const { sessionId, message, sender } = body;

    if (!sessionId || !message || !sender) {
      return NextResponse.json(
        { error: 'Session ID, message, and sender are required' },
        { status: 400 }
      );
    }

    if (!['user', 'admin', 'system'].includes(sender)) {
      return NextResponse.json(
        { error: 'Invalid sender type' },
        { status: 400 }
      );
    }

    // TODO: Supabase insert
    // const { data, error } = await supabase
    //   .from('chat_messages')
    //   .insert({
    //     id: crypto.randomUUID(),
    //     session_id: sessionId,
    //     text: message,
    //     sender,
    //     created_at: new Date().toISOString(),
    //   })
    //   .select()
    //   .single();
    //
    // if (error) throw error;
    // return NextResponse.json(data, { status: 201 });

    // Stub message response
    const stubMessage = {
      id: crypto.randomUUID(),
      session_id: sessionId,
      text: message,
      sender,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(stubMessage, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to send message';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
