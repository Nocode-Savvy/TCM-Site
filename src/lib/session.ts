import { SessionOptions } from 'iron-session';

export interface SessionData {
  isLoggedIn: boolean;
  user?: string;
  loginTime?: number;
}

// Fallback development secret (32+ chars) if SESSION_SECRET is not provided in local dev
const sessionPassword =
  process.env.SESSION_SECRET ||
  'tcm_secure_session_secret_min_32_characters_long_2026';

export const sessionOptions: SessionOptions = {
  password: sessionPassword,
  cookieName: '__Host-tcm-admin-session', // Prefixed with __Host- in production where applicable, fallback compatible
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  },
};
