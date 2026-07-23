'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import {
  demoVendorUser,
  getVendorBreadcrumbs,
  getVendorNavSections,
  getVendorRouteMeta,
} from '@/lib/vendor';
import { siteConfig } from '@/lib/site';

type VendorShellProps = {
  children: React.ReactNode;
};

/**
 * Vendor Workspace shell — assigned work only.
 * No global customers, CRM, employees, or U&V internal financial data.
 */
export function VendorShell({ children }: VendorShellProps) {
  const pathname = usePathname();
  const navSections = getVendorNavSections(pathname);
  const meta = getVendorRouteMeta(pathname);
  const breadcrumbs = getVendorBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      brand={
        <Link
          href="/vendor"
          className="uv-focus-ring rounded-uv-md"
          aria-label={`${siteConfig.name} Vendor Workspace`}
        >
          <Logo size="sm" />
        </Link>
      }
      brandCollapsed={
        <Link
          href="/vendor"
          className="uv-focus-ring rounded-uv-md font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-brand"
          aria-label={`${siteConfig.name} Vendor Workspace`}
        >
          U&V
        </Link>
      }
      navSections={navSections}
      sidebarFooter={
        <div className="space-y-2">
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Vendor Workspace
          </p>
          <p className="px-3 text-xs text-uv-foreground-muted">
            Assigned records only · no customer CRM
          </p>
          <Link
            href="/login/vendor"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
              'justify-start text-uv-foreground-muted',
            )}
          >
            Vendor sign-in entry
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
          name: demoVendorUser.name,
          role: demoVendorUser.role,
        },
      }}
    >
      {children}
    </EnterpriseAppShell>
  );
}
