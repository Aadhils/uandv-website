'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  EnterpriseAppShell,
  buttonVariants,
  cn,
  type BreadcrumbItem,
} from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { getWorkspaceNavSections } from '@/lib/workspace/navigation';
import { siteConfig } from '@/lib/site';

type WorkspaceShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
};

/**
 * App-level composition of the enterprise AppShell for U&V workspaces.
 */
export function WorkspaceShell({
  children,
  title,
  subtitle,
  breadcrumbs,
}: WorkspaceShellProps) {
  const pathname = usePathname();
  const navSections = getWorkspaceNavSections(pathname);

  return (
    <EnterpriseAppShell
      brand={
        <Link
          href="/dashboard"
          className="uv-focus-ring rounded-uv-md"
          aria-label={`${siteConfig.name} workspace`}
        >
          <Logo size="sm" />
        </Link>
      }
      brandCollapsed={
        <Link
          href="/dashboard"
          className="uv-focus-ring rounded-uv-md font-[family-name:var(--font-uv-display)] text-lg font-bold text-uv-brand"
          aria-label={`${siteConfig.name} workspace`}
        >
          U&V
        </Link>
      }
      navSections={navSections}
      sidebarFooter={
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm', fullWidth: true }),
            'justify-start text-uv-foreground-muted',
          )}
        >
          Back to website
        </Link>
      }
      topNav={{
        title,
        subtitle,
        breadcrumbs,
        user: {
          name: 'Workspace Guest',
          role: 'Foundation preview',
        },
      }}
    >
      {children}
    </EnterpriseAppShell>
  );
}
