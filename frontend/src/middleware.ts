import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth') && cookies().get('token')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    !cookies().get('token')
  ) {
    return NextResponse.redirect(new URL('/auth', request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*']
};
