import Link from 'next/link';
import type { ReactNode } from 'react';

import { ThemeToggle } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { siteConfig } from '@/lib/site';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-uv-background lg:flex-row">
      <aside className="relative hidden overflow-hidden bg-uv-navy text-white lg:flex lg:w-[42%] lg:flex-col lg:justify-between lg:px-10 lg:py-10 xl:px-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 10%, color-mix(in srgb, var(--uv-brand) 45%, transparent), transparent 60%), radial-gradient(ellipse 60% 45% at 90% 90%, color-mix(in srgb, var(--uv-soft-violet) 25%, transparent), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex uv-focus-ring rounded-uv-md"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo invert size="lg" />
          </Link>
          <p className="mt-10 max-w-sm font-[family-name:var(--font-uv-display)] text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
            One identity.
            <br />
            Many workspaces.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75 xl:text-base">
            Sign in once to access Customer, Vendor, Partner, and future
            Employee or Admin workspaces — built on the U&V Business Workspace
            foundation.
          </p>
        </div>
        <p className="relative z-10 text-xs text-white/55">
          {siteConfig.legalName} · Identity & Access Foundation · Sprint 3.0.2
        </p>
      </aside>

      <div className="flex min-h-dvh flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-uv-border px-4 py-4 sm:px-6 lg:border-0 lg:px-10 lg:pt-8">
          <Link
            href="/"
            className="inline-flex lg:hidden uv-focus-ring rounded-uv-md"
            aria-label={`${siteConfig.name} home`}
          >
            <Logo size="sm" />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="hidden text-sm font-medium text-uv-foreground-muted transition-colors hover:text-uv-brand sm:inline uv-focus-ring rounded-uv-md px-2 py-1"
            >
              Back to website
            </Link>
          </div>
        </header>

        <main
          id="auth-main"
          className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 sm:py-10 lg:items-center lg:px-10"
        >
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
}
