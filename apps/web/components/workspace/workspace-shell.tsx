'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { BackToTop } from '@/components/shared/back-to-top';
import {
  demoCustomerProfile,
  getCustomerBreadcrumbs,
  getCustomerNavSections,
  getCustomerRouteMeta,
} from '@/lib/customer';
import { siteConfig } from '@/lib/site';

type WorkspaceShellProps = {
  children: React.ReactNode;
};

/**
 * Customer Workspace shell — reuses Enterprise App Shell with customer nav.
 */
export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const pathname = usePathname();
  const navSections = getCustomerNavSections(pathname);
  const meta = getCustomerRouteMeta(pathname);
  const breadcrumbs = getCustomerBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      brand={
        <Link
          href="/dashboard"
          className="uv-focus-ring rounded-uv-md"
          aria-label={`${siteConfig.name} Customer Workspace`}
        >
          <Logo size="sm" />
        </Link>
      }
      brandCollapsed={
        <Link
          href="/dashboard"
          className="uv-focus-ring rounded-uv-md font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-brand"
          aria-label={`${siteConfig.name} Customer Workspace`}
        >
          U&V
        </Link>
      }
      navSections={navSections}
      sidebarFooter={
        <div className="space-y-2">
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Customer Workspace
          </p>
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
          name: demoCustomerProfile.fullName,
          role: 'Customer · Demo',
        },
      }}
    >
      {children}
      <BackToTop scrollRootSelector="#workspace-main" />
    </EnterpriseAppShell>
  );
}
