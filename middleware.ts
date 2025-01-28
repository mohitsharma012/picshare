import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define all auth-related pages
  const publicPages = ['/auth/login', '/signin', '/login'];
  const isPublicPage = publicPages.some(page => request.nextUrl.pathname === page);

  // Get the token from cookies
  const authToken = request.cookies.get('authToken')?.value;

  // Redirect /signin and /login to /auth/login for consistency
  if (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If the user is not logged in and trying to access a protected page, redirect to login
  if (!authToken && !isPublicPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If the user is on an auth page and is already logged in, redirect to upload page
  if (isPublicPage && authToken) {
    return NextResponse.redirect(new URL('/upload', request.url));
  }

  // Clone the request headers and add the Authorization header if token exists
  const requestHeaders = new Headers(request.headers);
  if (authToken) {
    requestHeaders.set('Authorization', `Bearer ${authToken}`);
  }

  // Return the response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - uploads (user uploaded files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};