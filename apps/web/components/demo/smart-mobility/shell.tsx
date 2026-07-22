'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { ThemeToggle, buttonVariants, cn } from '@uandv/ui';

import { DEMO_LABEL } from '@/lib/demo/smart-mobility/mock-data';

const tabs = [
  { href: '/demo/smart-mobility', label: 'Customer Booking' },
  { href: '/demo/smart-mobility/activity', label: 'Ride Activity' },
  { href: '/demo/smart-mobility/driver', label: 'Driver Partner' },
  { href: '/demo/smart-mobility/admin', label: 'Admin & Fleet' },
] as const;

export function SmartMobilityShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-svh bg-uv-background-subtle text-uv-foreground">
      <div className="border-b border-uv-border bg-uv-navy text-uv-footer-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-uv-soft-violet">
              {DEMO_LABEL} · Smart Mobility Platform
            </p>
            <p className="mt-1 text-sm text-uv-soft-violet/80">
              Bike · Auto · Cab · Rental · Parcel · Driver App · Admin — mock data only
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <Link
              href="/portfolio/taxi-booking-application"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'border-white/25 bg-transparent text-white hover:bg-white/10',
              )}
            >
              Case study
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'ghost' }),
                'text-white hover:bg-white/10',
              )}
            >
              Website
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-uv-border bg-uv-background">
        <div className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {tabs.map((tab) => {
            const active =
              tab.href === '/demo/smart-mobility'
                ? pathname === tab.href
                : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'shrink-0 rounded-uv-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'uv-brand-gradient border-transparent text-white'
                    : 'border-uv-border bg-uv-background-subtle text-uv-foreground-muted hover:border-uv-brand/40 hover:text-uv-foreground',
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
