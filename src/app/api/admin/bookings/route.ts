import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { initDB } from '@/lib/db';

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await initDB();
    const result = await sql`
      SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200
    `;
    return NextResponse.json({ bookings: result.rows });
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json({ bookings: [] });
  }
}
