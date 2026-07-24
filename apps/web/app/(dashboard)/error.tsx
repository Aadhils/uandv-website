'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

/**
 * Isolates customer workspace page failures so the sidebar stays usable.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ensure a crashed page cannot leave body scroll locked from a drawer.
    document.body.style.overflow = '';
    console.error('[customer-workspace]', error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
        This page could not load
      </h2>
      <p className="text-sm text-uv-foreground-muted">
        Something went wrong in this workspace view. Your sidebar should still
        work — try again or open another section.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className={cn(buttonVariants({ size: 'sm' }))}
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
