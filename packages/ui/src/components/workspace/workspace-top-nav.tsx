'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';
import { Avatar } from '../avatar';
import { Breadcrumb, type BreadcrumbItem } from '../breadcrumb';
import { Icon } from '../icon';
import { ThemeToggle } from '../../providers/theme-toggle';

export type WorkspaceTopNavProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Mobile menu control — opens the App Shell sidebar drawer */
  onMenuClick?: () => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  user?: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  className?: string;
};

/**
 * Workspace top bar: breadcrumbs/title, search placeholder, notifications, profile.
 */
export function WorkspaceTopNav({
  title,
  subtitle,
  breadcrumbs,
  onMenuClick,
  searchPlaceholder = 'Search workspace…',
  actions,
  user,
  className,
}: WorkspaceTopNavProps) {
  const hasBreadcrumbs = Boolean(breadcrumbs && breadcrumbs.length > 0);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex min-h-16 shrink-0 flex-col justify-center gap-1 border-b border-uv-border bg-uv-background/95 px-4 py-2.5 backdrop-blur-md sm:px-6',
        className,
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {onMenuClick ? (
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg text-uv-foreground transition-colors hover:bg-uv-background-muted lg:hidden uv-focus-ring"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <Icon name="Menu" size="md" />
          </button>
        ) : null}

        <div className="min-w-0 flex-1 space-y-0.5">
          {hasBreadcrumbs ? (
            <Breadcrumb items={breadcrumbs!} className="hidden sm:block" />
          ) : null}
          <h1 className="truncate font-[family-name:var(--font-uv-display)] text-base font-semibold tracking-tight text-uv-foreground sm:text-lg">
            {title}
          </h1>
          {subtitle && !hasBreadcrumbs ? (
            <p className="hidden truncate text-xs text-uv-foreground-muted sm:block">
              {subtitle}
            </p>
          ) : null}
          {hasBreadcrumbs ? (
            <div className="sm:hidden">
              <Breadcrumb items={breadcrumbs!} />
            </div>
          ) : null}
        </div>

        <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <Icon
              name="Search"
              size="sm"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-uv-foreground-subtle"
            />
            <input
              type="search"
              disabled
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background-muted py-2 pl-9 pr-3 text-sm text-uv-foreground placeholder:text-uv-foreground-subtle disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Search (coming soon)"
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {actions}
          <ThemeToggle />
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-uv-lg text-uv-foreground transition-colors hover:bg-uv-background-muted uv-focus-ring"
            aria-label="Notifications (coming soon)"
            disabled
          >
            <Icon name="Bell" size="md" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-uv-brand" aria-hidden />
          </button>
          {user ? (
            <div
              className="ml-1 flex items-center gap-2 border-l border-uv-border pl-2 sm:pl-3"
              aria-label={`Signed in as ${user.name} (placeholder)`}
            >
              <Avatar
                size="sm"
                src={user.avatarUrl}
                alt={user.name}
                fallback={user.name}
              />
              <div className="hidden min-w-0 lg:block">
                <p className="truncate text-sm font-medium text-uv-foreground">
                  {user.name}
                </p>
                {user.role ? (
                  <p className="truncate text-xs text-uv-foreground-muted">
                    {user.role}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
