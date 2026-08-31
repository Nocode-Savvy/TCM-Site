import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getAdminPasswordHash, setAdminPasswordHash } from '@/lib/db';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const { currentPassword, newPassword } = body;

    if (!currentPassword || typeof currentPassword !== 'string') {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long.' }, { status: 400 });
    }

    const currentHash = await getAdminPasswordHash();
    if (!currentHash) {
      return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 500 });
    }

    // Verify current password
    const isCurrentValid = await bcrypt.compare(currentPassword, currentHash);
    if (!isCurrentValid) {
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
    }

    // Hash new password
    const newHash = await bcrypt.hash(newPassword, 10);

    // Save to database
    const saved = await setAdminPasswordHash(newHash);
    if (!saved) {
      return NextResponse.json(
        {
          warning: true,
          message: 'Password verified. Note: If database is in local mode, update ADMIN_PASSWORD_HASH in .env.local with the new hash.',
          newHash,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, message: 'Admin password changed successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to update password. Please try again.' }, { status: 500 });
  }
}
