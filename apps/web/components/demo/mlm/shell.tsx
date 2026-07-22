'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { Icon, ThemeToggle, buttonVariants, cn } from '@uandv/ui';

import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import { getNavForRole } from '@/lib/demo/mlm/nav';

export function MlmDemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useMlmDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getNavForRole(session?.role ?? 'member');

  const onLogout = () => {
    logout();
    router.replace('/demo/mlm/login');
  };

  return (
    <div className="min-h-svh bg-uv-background-subtle text-uv-foreground">
      <div className="border-b border-uv-border bg-uv-navy text-uv-footer-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6">
          <p className="font-medium text-uv-soft-violet">
            U&amp;V MLM Software Demo — interactive mock data, no live backend
          </p>
          <Link
            href="/solutions/mlm-software"
            className="shrink-0 underline-offset-4 hover:underline"
          >
            About this product
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-40px)] max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-uv-border bg-uv-background lg:flex">
          <div className="flex h-16 items-center border-b border-uv-border px-5">
            <Link href="/demo/mlm/dashboard" className="font-bold tracking-tight text-uv-brand">
              U&amp;V MLM
            </Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="MLM demo">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-uv-brand-muted text-uv-brand'
                      : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground',
                  )}
                >
                  <Icon name={item.icon} size="sm" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-uv-border p-4">
            <p className="text-sm font-medium text-uv-foreground">{session?.name}</p>
            <p className="text-xs capitalize text-uv-foreground-muted">
              {session?.role} · {session?.rank}
            </p>
            <button
              type="button"
              onClick={onLogout}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'mt-3 w-full justify-center',
              )}
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-uv-border bg-uv-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg border border-uv-border lg:hidden"
                onClick={() => setMobileOpen((open) => !open)}
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                <Icon name={mobileOpen ? 'X' : 'Menu'} />
              </button>
              <div className="lg:hidden">
                <p className="text-sm font-semibold text-uv-foreground">U&amp;V MLM Demo</p>
                <p className="text-xs capitalize text-uv-foreground-muted">
                  {session?.role} · {session?.memberId}
                </p>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm text-uv-foreground-muted">
                  Signed in as{' '}
                  <span className="font-medium text-uv-foreground">{session?.name}</span>
                  <span className="ml-2 rounded-uv-full bg-uv-brand-muted px-2 py-0.5 text-xs font-medium capitalize text-uv-brand">
                    {session?.role}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/demo/mlm/notifications"
                className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg border border-uv-border text-uv-foreground-muted hover:text-uv-foreground"
                aria-label="Notifications"
              >
                <Icon name="Bell" size="sm" />
              </Link>
              <ThemeToggle />
              <button
                type="button"
                onClick={onLogout}
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'ghost' }),
                  'hidden sm:inline-flex lg:hidden',
                )}
              >
                Sign out
              </button>
            </div>
          </header>

          {mobileOpen ? (
            <div className="max-h-[60vh] overflow-y-auto border-b border-uv-border bg-uv-background p-3 lg:hidden">
              <nav className="grid gap-1" aria-label="MLM demo mobile">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium',
                        active
                          ? 'bg-uv-brand-muted text-uv-brand'
                          : 'text-uv-foreground-muted hover:bg-uv-background-muted',
                      )}
                    >
                      <Icon name={item.icon} size="sm" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ) : null}

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
