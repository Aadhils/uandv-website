'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { Icon, ThemeToggle, buttonVariants, cn } from '@uandv/ui';

import { useHotelDemoAuth } from '@/lib/demo/hotel/auth-context';
import { hotelName } from '@/lib/demo/hotel/mock-data';
import { getNavForRole } from '@/lib/demo/hotel/nav';
import { homeForRole } from '@/lib/demo/hotel/types';

export function HotelDemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { session, logout } = useHotelDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getNavForRole(session?.role ?? 'admin');
  const home = homeForRole(session?.role ?? 'admin');

  const onLogout = () => {
    logout();
    window.location.replace('/demo/hotel-management/login');
  };

  return (
    <div className="min-h-svh bg-uv-background-subtle text-uv-foreground">
      <div className="border-b border-uv-border bg-uv-navy text-uv-footer-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6">
          <p className="font-medium text-uv-soft-violet">
            Product Demo — Mock Data · U&amp;V Hotel Management Platform
          </p>
          <Link
            href="/services/hotel-restaurant-software"
            className="shrink-0 underline-offset-4 hover:underline"
          >
            About this product
          </Link>
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-40px)] max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-uv-border bg-uv-background lg:flex">
          <div className="flex h-16 items-center border-b border-uv-border px-5">
            <Link href={home} className="font-bold tracking-tight text-uv-brand">
              U&amp;V HotelOS
            </Link>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Hotel demo">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== home &&
                  item.href !== '/demo/hotel-management/reservations' &&
                  pathname.startsWith(item.href));
              const reservationActive =
                item.href === '/demo/hotel-management/reservations' &&
                pathname.startsWith('/demo/hotel-management/reservations') &&
                !pathname.includes('/new');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active || reservationActive
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
              {session?.role} · {hotelName}
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
                onClick={() => setMobileOpen((o) => !o)}
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                <Icon name={mobileOpen ? 'X' : 'Menu'} />
              </button>
              <div className="lg:hidden">
                <p className="text-sm font-semibold">U&amp;V HotelOS</p>
                <p className="text-xs capitalize text-uv-foreground-muted">{session?.role}</p>
              </div>
              <p className="hidden text-sm text-uv-foreground-muted lg:block">
                Property operations demo · mock reservations only
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
              <nav className="grid gap-1">
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
