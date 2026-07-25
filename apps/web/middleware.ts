import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const secretKey = process.env.CLERK_SECRET_KEY?.trim();
const secretLooksValid = Boolean(secretKey && secretKey.startsWith('sk_'));

const isCustomerProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/me(.*)',
]);

const isAdminProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
]);

const isCustomerAuthRoute = createRouteMatcher([
  '/login',
  '/signup',
  '/forgot-password(.*)',
  '/verify-email(.*)',
]);

const isAdminAuthRoute = createRouteMatcher(['/login/admin']);

function withNoStore(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

const middleware = publishableKey
  ? clerkMiddleware(async (auth, request) => {
      const { userId, sessionId } = await auth();
      const path = request.nextUrl.pathname;
      const redirectParam = request.nextUrl.searchParams.get('redirect_url');

      console.log('[uv-auth:middleware]', {
        pathname: path,
        userId: userId ?? null,
        sessionId: sessionId ?? null,
        secretLooksValid,
        redirect_url: redirectParam,
      });

      const isProtected =
        isCustomerProtectedRoute(request) || isAdminProtectedRoute(request);

      if (isProtected && !userId) {
        if (!secretLooksValid) {
          console.warn(
            '[uv-auth:middleware] CLERK_SECRET_KEY is missing or not an sk_ key; allowing protected route through to avoid redirect loop',
            path,
          );
          return withNoStore(NextResponse.next());
        }

        const loginPath = isAdminProtectedRoute(request) ? '/login/admin' : '/login';
        const login = new URL(loginPath, request.url);
        login.searchParams.set('redirect_url', path);
        return NextResponse.redirect(login);
      }

      if (isAdminAuthRoute(request) && userId) {
        const safeRedirect =
          redirectParam &&
          redirectParam.startsWith('/') &&
          !redirectParam.startsWith('//') &&
          !redirectParam.startsWith('/login')
            ? redirectParam
            : '/admin';

        console.log('[uv-auth:middleware] signed-in on admin login →', safeRedirect);
        return NextResponse.redirect(new URL(safeRedirect, request.url));
      }

      if (isCustomerAuthRoute(request) && userId && path !== '/signup/pending') {
        const safeRedirect =
          redirectParam &&
          redirectParam.startsWith('/') &&
          !redirectParam.startsWith('//') &&
          !redirectParam.startsWith('/login')
            ? redirectParam
            : '/dashboard';

        console.log('[uv-auth:middleware] signed-in on customer auth route →', safeRedirect);
        return NextResponse.redirect(new URL(safeRedirect, request.url));
      }

      if (isProtected) {
        return withNoStore(NextResponse.next());
      }

      return NextResponse.next();
    })
  : (request: Request) => {
      const url = new URL(request.url);
      console.warn('[uv-auth:middleware] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY missing');
      if (
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/api/me') ||
        url.pathname.startsWith('/admin') ||
        url.pathname.startsWith('/api/admin')
      ) {
        const loginPath = url.pathname.startsWith('/admin')
          ? '/login/admin'
          : '/login';
        const login = new URL(loginPath, url.origin);
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
