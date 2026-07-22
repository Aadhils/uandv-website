'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { Icon, ThemeToggle, buttonVariants, cn } from '@uandv/ui';
import { useSuiteDemoAuth } from '@/lib/demo/enterprise-suite/auth-context';
import { getNavForRole } from '@/lib/demo/enterprise-suite/nav';

export function SuiteDemoShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout } = useSuiteDemoAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getNavForRole(session?.role ?? 'admin');

  const onLogout = () => {
    logout();
    router.replace('/demo/enterprise-suite/login');
  };

  return (
    <div className="min-h-svh bg-uv-background-subtle text-uv-foreground">
      <div className="border-b border-uv-border bg-uv-navy text-uv-footer-foreground">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2.5 text-xs sm:px-6">
          <p className="font-medium text-uv-soft-violet">Product Demo · U&amp;V Enterprise ERP, CRM &amp; Travel Suite — mock data only</p>
          <Link href="/services/erp-software" className="shrink-0 underline-offset-4 hover:underline">About this product</Link>
        </div>
      </div>
      <div className="mx-auto flex min-h-[calc(100svh-40px)] max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-uv-border bg-uv-background lg:flex">
          <div className="flex h-16 items-center border-b border-uv-border px-5">
            <Link href={session?.role === 'travel' ? '/demo/enterprise-suite/travel' : '/demo/enterprise-suite/dashboard'} className="font-bold tracking-tight text-uv-brand">U&amp;V Suite</Link>
          </div>
          <nav className="flex-1 space-y-5 overflow-y-auto p-3" aria-label="Enterprise suite">
            {nav.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-uv-foreground-muted">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                      <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors', active ? 'bg-uv-brand-muted text-uv-brand' : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground')}>
                        <Icon name={item.icon} size="sm" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="border-t border-uv-border p-4">
            <p className="text-sm font-medium text-uv-foreground">{session?.name}</p>
            <p className="text-xs capitalize text-uv-foreground-muted">{session?.role} · {session?.title}</p>
            <button type="button" onClick={onLogout} className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'mt-3 w-full justify-center')}>Sign out</button>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-uv-border bg-uv-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg border border-uv-border lg:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
                <Icon name={mobileOpen ? 'X' : 'Menu'} />
              </button>
              <div className="lg:hidden">
                <p className="text-sm font-semibold">U&amp;V Suite Demo</p>
                <p className="text-xs capitalize text-uv-foreground-muted">{session?.role}</p>
              </div>
              <p className="hidden text-sm text-uv-foreground-muted lg:block">
                Signed in as <span className="font-medium text-uv-foreground">{session?.name}</span>
                <span className="ml-2 rounded-uv-full bg-uv-brand-muted px-2 py-0.5 text-xs font-medium capitalize text-uv-brand">{session?.role}</span>
              </p>
            </div>
            <ThemeToggle />
          </header>
          {mobileOpen ? (
            <div className="max-h-[70vh] overflow-y-auto border-b border-uv-border bg-uv-background p-3 lg:hidden">
              {nav.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-uv-foreground-muted">{group.label}</p>
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium text-uv-foreground-muted hover:bg-uv-background-muted">
                      <Icon name={item.icon} size="sm" />{item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          ) : null}
          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
