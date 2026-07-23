'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { BackToTop } from '@/components/shared/back-to-top';
import {
  demoAdminUser,
  getAdminBreadcrumbs,
  getAdminNavSections,
  getAdminRouteMeta,
} from '@/lib/admin';
import { siteConfig } from '@/lib/site';

type AdminShellProps = {
  children: React.ReactNode;
};

/**
 * Admin Workspace shell — Enterprise App Shell + admin navigation.
 * Demo UI only; no elevated production permissions.
 */
export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const navSections = getAdminNavSections(pathname);
  const meta = getAdminRouteMeta(pathname);
  const breadcrumbs = getAdminBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      brand={
        <Link
          href="/admin"
          className="uv-focus-ring rounded-uv-md"
          aria-label={`${siteConfig.name} Admin Workspace`}
        >
          <Logo size="sm" />
        </Link>
      }
      brandCollapsed={
        <Link
          href="/admin"
          className="uv-focus-ring rounded-uv-md font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-brand"
          aria-label={`${siteConfig.name} Admin Workspace`}
        >
          U&V
        </Link>
      }
      navSections={navSections}
      sidebarFooter={
        <div className="space-y-2">
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Admin Workspace
          </p>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
              'justify-start text-uv-foreground-muted',
            )}
          >
            Customer workspace
          </Link>
          <Link
            href="/employee"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
              'justify-start text-uv-foreground-muted',
            )}
          >
            Employee workspace
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
              'justify-start text-uv-foreground-muted',
            )}
          >
            Back to website
          </Link>
        </div>
      }
      topNav={{
        title: meta.title,
        subtitle: meta.subtitle,
        breadcrumbs,
        user: {
          name: demoAdminUser.name,
          role: demoAdminUser.role,
        },
      }}
    >
      {children}
      <BackToTop scrollRootSelector="#workspace-main" />
    </EnterpriseAppShell>
  );
}
