import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const secretKey = process.env.CLERK_SECRET_KEY?.trim();
const secretLooksValid = Boolean(secretKey && secretKey.startsWith('sk_'));

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/me(.*)',
]);

const isAuthRoute = createRouteMatcher([
  '/login(.*)',
  '/signup',
  '/forgot-password(.*)',
  '/verify-email(.*)',
]);

const middleware = publishableKey
  ? clerkMiddleware(async (auth, request) => {
      const { userId, sessionId } = await auth();
      const path = request.nextUrl.pathname;
      const redirectParam = request.nextUrl.searchParams.get('redirect_url');

      // Temporary diagnostics for redirect-loop debugging
      console.log('[uv-auth:middleware]', {
        pathname: path,
        userId: userId ?? null,
        sessionId: sessionId ?? null,
        secretLooksValid,
        redirect_url: redirectParam,
      });

      // Signed-out users → /login (only when the server can verify sessions).
      // If CLERK_SECRET_KEY is invalid, auth() never returns userId even when the
      // browser has a Clerk session — forcing /login causes an infinite loop.
      if (isProtectedRoute(request) && !userId) {
        if (!secretLooksValid) {
          console.warn(
            '[uv-auth:middleware] CLERK_SECRET_KEY is missing or not an sk_ key; allowing protected route through to avoid redirect loop',
            path,
          );
          return NextResponse.next();
        }

        const login = new URL('/login', request.url);
        // Preserve redirect_url only for signed-out users
        login.searchParams.set('redirect_url', path);
        return NextResponse.redirect(login);
      }

      // Signed-in users leave auth pages (except vendor/partner pending).
      // Never send them back to /login.
      if (isAuthRoute(request) && userId && path !== '/signup/pending') {
        const safeRedirect =
          redirectParam &&
          redirectParam.startsWith('/') &&
          !redirectParam.startsWith('//') &&
          !redirectParam.startsWith('/login')
            ? redirectParam
            : '/dashboard';

        console.log('[uv-auth:middleware] signed-in on auth route →', safeRedirect);
        return NextResponse.redirect(new URL(safeRedirect, request.url));
      }

      return NextResponse.next();
    })
  : (request: Request) => {
      const url = new URL(request.url);
      console.warn('[uv-auth:middleware] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY missing');
      if (
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/api/me')
      ) {
        const login = new URL('/login', url.origin);
        login.searchParams.set('redirect_url', url.pathname);
        return NextResponse.redirect(login);
      }
      return NextResponse.next();
    };

export default middleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
