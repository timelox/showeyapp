import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // Add paths that require authentication
  const protectedPaths = ['/dashboard', '/upload'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !authCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}