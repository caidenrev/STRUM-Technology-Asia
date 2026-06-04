import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin route
  if (pathname.startsWith('/admin')) {
    const hasSession = request.cookies.has('admin_session');

    // If trying to access admin dashboard without session, redirect to login
    if (!hasSession && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If trying to access login page WITH session, redirect to dashboard
    if (hasSession && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
