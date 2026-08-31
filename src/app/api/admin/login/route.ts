import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getAdminPasswordHash } from '@/lib/db';

// Simple in-memory rate limiter for brute-force protection
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minute lockout after 5 failed attempts

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown-client';
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();

  // Check rate limit
  const rateRecord = loginAttempts.get(ip);
  if (rateRecord && rateRecord.blockedUntil > now) {
    const remainingSecs = Math.ceil((rateRecord.blockedUntil - now) / 1000);
    return NextResponse.json(
      { error: `Too many failed login attempts. Please try again in ${remainingSecs} seconds.` },
      { status: 429 }
    );
  }

  const response = NextResponse.json({ success: true });
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.password !== 'string' || body.password.trim() === '') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const { password } = body;
    const adminHash = await getAdminPasswordHash();

    // Security Check: ADMIN_PASSWORD_HASH must exist and be a valid bcrypt hash
    if (!adminHash || !adminHash.startsWith('$2') || adminHash.length < 50) {
      console.error('Security Alert: No valid admin password hash configured.');
      return NextResponse.json(
        { error: 'Admin portal authentication is not configured. Please set a valid ADMIN_PASSWORD_HASH in environment variables or database.' },
        { status: 503 }
      );
    }

    // Verify password securely against the bcrypt hash
    const isValid = await bcrypt.compare(password, adminHash);

    if (!isValid) {
      // Record failed attempt
      const attempts = (rateRecord?.count || 0) + 1;
      if (attempts >= MAX_ATTEMPTS) {
        loginAttempts.set(ip, { count: attempts, blockedUntil: now + LOCKOUT_MS });
      } else {
        loginAttempts.set(ip, { count: attempts, blockedUntil: 0 });
      }

      return NextResponse.json({ error: 'Invalid password. Please check and try again.' }, { status: 401 });
    }

    // Successful login: clear rate limit counter
    loginAttempts.delete(ip);

    // Save secure session
    session.isLoggedIn = true;
    session.user = 'admin';
    session.loginTime = now;
    await session.save();

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected authentication error occurred.' }, { status: 500 });
  }
}
