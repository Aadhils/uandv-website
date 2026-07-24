'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { BackToTop } from '@/components/shared/back-to-top';
import {
  demoEmployeeUser,
  getEmployeeBreadcrumbs,
  getEmployeeNavSections,
  getEmployeeRouteMeta,
} from '@/lib/employee';
import { siteConfig } from '@/lib/site';

type EmployeeShellProps = {
  children: React.ReactNode;
};

/**
 * Employee Workspace shell — assigned work only.
 * Demo UI; no access to global admin, payments, or all-customer records.
 */
export function EmployeeShell({ children }: EmployeeShellProps) {
  const pathname = usePathname();
  const navSections = getEmployeeNavSections(pathname);
  const meta = getEmployeeRouteMeta(pathname);
  const breadcrumbs = getEmployeeBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      brand={
        <Link
          href="/employee"
          className="uv-focus-ring rounded-uv-md"
          aria-label={`${siteConfig.name} Employee Workspace`}
        >
          <Logo size="sm" />
        </Link>
      }
      brandCollapsed={
        <Link
          href="/employee"
          className="uv-focus-ring rounded-uv-md font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-brand"
          aria-label={`${siteConfig.name} Employee Workspace`}
        >
          U&V
        </Link>
      }
      navSections={navSections}
      sidebarFooter={
        <div className="space-y-2">
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Employee Workspace
          </p>
          <p className="px-3 text-xs text-uv-foreground-muted">
            Assigned records only · no admin settings
          </p>
          <Link
            href="/login/employee"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
              'justify-start text-uv-foreground-muted',
            )}
          >
            Employee sign-in entry
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
          name: demoEmployeeUser.name,
          role: demoEmployeeUser.role,
        },
      }}
    >
      {children}
      <BackToTop scrollRootSelector="#workspace-main" />
    </EnterpriseAppShell>
  );
}
