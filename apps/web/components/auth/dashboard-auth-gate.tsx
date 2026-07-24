'use client';

import { useAuth } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type DashboardAuthGateProps = {
  /** Present when the server already verified a Clerk userId. */
  serverUserId?: string | null;
  children?: React.ReactNode;
};

/**
 * Client auth gate for /dashboard.
 * Waits for Clerk to load before deciding. Avoids redirecting while loading
 * (which previously contributed to login↔dashboard loops).
 */
export function DashboardAuthGate({
  serverUserId = null,
  children,
}: DashboardAuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, isSignedIn, userId, sessionId } = useAuth();
  const redirectedRef = React.useRef(false);

  React.useEffect(() => {
    const redirectTarget = '/login?redirect_url=%2Fdashboard';
    // Temporary diagnostics for redirect-loop debugging
    console.log('[uv-auth:dashboard]', {
      pathname,
      isLoaded,
      isSignedIn,
      userId,
      sessionId,
      serverUserId,
      redirectTarget,
    });

    if (!isLoaded || redirectedRef.current) return;

    if (!isSignedIn) {
      redirectedRef.current = true;
      router.replace(redirectTarget);
    }
  }, [isLoaded, isSignedIn, userId, sessionId, serverUserId, pathname, router]);

  if (!isLoaded) {
    return (
      <p className="text-sm text-uv-foreground-muted" role="status">
        Loading your workspace…
      </p>
    );
  }

  if (!isSignedIn) {
    return (
      <p className="text-sm text-uv-foreground-muted" role="status">
        Redirecting to sign in…
      </p>
    );
  }

  // Client session exists but middleware/server could not verify it (often bad CLERK_SECRET_KEY).
  if (!serverUserId && !children) {
    return (
      <div className="mx-auto max-w-lg space-y-3 rounded-uv-2xl border border-uv-border bg-uv-background p-6">
        <p className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Session active, server not verified
        </p>
        <p className="text-sm text-uv-foreground-muted">
          Clerk reports you are signed in in the browser, but the server middleware
          could not verify the session. Set a valid{' '}
          <code className="text-xs">CLERK_SECRET_KEY</code> (<code className="text-xs">sk_test_…</code> or{' '}
          <code className="text-xs">sk_live_…</code>) in{' '}
          <code className="text-xs">apps/web/.env.local</code>, restart the dev
          server, then reload.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
