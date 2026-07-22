'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { Icon, ThemeToggle, buttonVariants, cn } from '@uandv/ui';

import { useTravelDemoAuth } from '@/lib/demo/travel/auth-context';
import { getNavForRole } from '@/lib/demo/travel/nav';

export function TravelDemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useTravelDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getNavForRole(session?.role ?? 'traveler');

  const onLogout = () => {
    logout();
    router.replace('/demo/travel/login');
  };

  return (
    <div className="min-h-svh bg-uv-background-subtle text-uv-foreground">
      <div className="border-b border-uv-border bg-uv-navy text-uv-footer-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6">
          <p className="font-medium text-uv-soft-violet">
            Product Demo · Mock Data — U&amp;V Travel &amp; Tourism Platform (no live backend)
          </p>
          <Link
            href="/services/travel-tourism-software"
            className="shrink-0 underline-offset-4 hover:underline"
          >
            About this product
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-40px)] max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-uv-border bg-uv-background lg:flex">
          <div className="flex h-16 items-center border-b border-uv-border px-5">
            <Link
              href={
                session?.role === 'admin'
                  ? '/demo/travel/admin'
                  : session?.role === 'agent'
                    ? '/demo/travel/agent'
                    : '/demo/travel/portal'
              }
              className="font-bold tracking-tight text-uv-brand"
            >
              U&amp;V Travel
            </Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Travel demo">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/demo/travel/admin' &&
                  item.href !== '/demo/travel/agent' &&
                  item.href !== '/demo/travel/portal' &&
                  pathname.startsWith(item.href));
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
            <p className="text-xs capitalize text-uv-foreground-muted">{session?.role}</p>
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
                <p className="text-sm font-semibold text-uv-foreground">U&amp;V Travel Demo</p>
                <p className="text-xs capitalize text-uv-foreground-muted">{session?.role}</p>
              </div>
              <p className="hidden text-sm text-uv-foreground-muted lg:block">
                Interactive booking workspace · mock inventory only
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onLogout}
                className={cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'lg:hidden')}
              >
                Sign out
              </button>
            </div>
          </header>

          {mobileOpen ? (
            <div className="border-b border-uv-border bg-uv-background p-3 lg:hidden">
              <nav className="grid gap-1" aria-label="Travel demo mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium',
                      pathname === item.href
                        ? 'bg-uv-brand-muted text-uv-brand'
                        : 'text-uv-foreground-muted',
                    )}
                  >
                    <Icon name={item.icon} size="sm" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ) : null}

          <main className="flex-1 space-y-6 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
