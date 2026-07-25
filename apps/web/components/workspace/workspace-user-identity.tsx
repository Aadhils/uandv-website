'use client';

import Link from 'next/link';
import * as React from 'react';

import { Avatar, cn } from '@uandv/ui';

import { ClerkSignOutButton } from '@/components/auth/clerk-sign-out-button';
import type { WorkspaceUserDisplay } from '@/lib/auth/workspace-user';

export type WorkspaceUserIdentityProps = {
  user?: WorkspaceUserDisplay | null;
  loading?: boolean;
  signOutRedirectUrl: string;
  profileHref?: string;
  className?: string;
};

function UserSkeleton() {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <div className="h-8 w-8 animate-pulse rounded-full bg-uv-background-muted" />
      <div className="hidden min-w-0 space-y-1 lg:block">
        <div className="h-3.5 w-24 animate-pulse rounded bg-uv-background-muted" />
        <div className="h-3 w-16 animate-pulse rounded bg-uv-background-muted" />
      </div>
    </div>
  );
}

export function WorkspaceUserIdentity({
  user,
  loading = false,
  signOutRedirectUrl,
  profileHref,
  className,
}: WorkspaceUserIdentityProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  if (loading) {
    return (
      <div className={cn('ml-1 border-l border-uv-border pl-2 sm:pl-3', className)}>
        <UserSkeleton />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className={cn('relative ml-1 border-l border-uv-border pl-2 sm:pl-3', className)}
    >
      <button
        type="button"
        className="flex items-center gap-2 rounded-uv-lg px-1 py-1 text-left transition-colors hover:bg-uv-background-muted uv-focus-ring"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label={`Account menu for ${user.name}`}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Avatar
          size="sm"
          src={user.avatarUrl ?? undefined}
          alt={user.name}
          fallback={user.name}
        />
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-sm font-medium text-uv-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-uv-foreground-muted">
            {user.roleLabel}
          </p>
        </div>
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-uv-xl border border-uv-border bg-uv-background p-3 shadow-uv-lg"
        >
          <div className="flex items-center gap-3 border-b border-uv-border pb-3">
            <Avatar
              size="md"
              src={user.avatarUrl ?? undefined}
              alt={user.name}
              fallback={user.name}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-uv-foreground">
                {user.name}
              </p>
              <p className="truncate text-xs text-uv-foreground-muted">
                {user.email}
              </p>
              <p className="mt-0.5 text-xs text-uv-brand">{user.roleLabel}</p>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            {profileHref ? (
              <Link
                href={profileHref}
                role="menuitem"
                className="block rounded-uv-lg px-3 py-2 text-sm text-uv-foreground transition-colors hover:bg-uv-background-muted"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            ) : null}
            <ClerkSignOutButton
              redirectUrl={signOutRedirectUrl}
              label="Sign out"
              className="w-full justify-start px-3"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
