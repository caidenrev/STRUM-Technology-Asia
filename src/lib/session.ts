import { cookies } from 'next/headers';
import crypto from 'crypto';

const SECRET = process.env.JWT_SECRET || 'fallback-strum-secret-key-129038!';

export interface SessionData {
  userId: number;
  username: string;
  role: string;
  expires: number;
}

// Signs session object and returns a token string
export function signSession(data: Omit<SessionData, 'expires'>): string {
  const expires = Date.now() + 8 * 60 * 60 * 1000; // 8 hours duration
  const payload = JSON.stringify({ ...data, expires });
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64')}.${signature}`;
}

// Verifies token string and returns parsed data, or null if invalid/expired
export function verifySession(token: string): SessionData | null {
  try {
    const [payloadBase64, signature] = token.split('.');
    if (!payloadBase64 || !signature) return null;

    const payload = Buffer.from(payloadBase64, 'base64').toString('utf8');
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(payload) as SessionData;
    if (Date.now() > data.expires) return null; // Expired

    return data;
  } catch (e) {
    return null;
  }
}

// Sets the session cookie (Helper to be used in Route Handlers / Server Actions)
export async function setSessionCookie(data: Omit<SessionData, 'expires'>) {
  const token = signSession(data);
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60, // 8 hours
  });
}

// Clears the session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

// Retrieves and verifies the current session
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  return verifySession(token);
}
