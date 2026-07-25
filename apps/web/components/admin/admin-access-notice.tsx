'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

function AdminAccessNoticeInner() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error !== 'admin_required') {
    return null;
  }

  return (
    <div
      className="rounded-uv-2xl border border-uv-warning/40 bg-uv-warning/5 px-4 py-4 sm:px-5"
      role="alert"
    >
      <p className="text-sm font-medium text-uv-foreground">
        Admin access required for Lead Management
      </p>
      <p className="mt-2 text-sm text-uv-foreground-muted">
        You are signed in, but this account does not have the{' '}
        <code className="text-xs">ADMIN</code> role in the platform database.
        The demo admin workspace does not grant access to live lead data. Sign in
        with an admin account, or ask your platform admin to set{' '}
        <code className="text-xs">publicMetadata.role</code> to{' '}
        <code className="text-xs">ADMIN</code> in Clerk and reload.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/login/admin?redirect_url=%2Fadmin%2Fleads%2Flist"
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          Sign in as admin
        </Link>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Go to customer workspace
        </Link>
      </div>
    </div>
  );
}

export function AdminAccessNotice() {
  return (
    <Suspense fallback={null}>
      <AdminAccessNoticeInner />
    </Suspense>
  );
}
