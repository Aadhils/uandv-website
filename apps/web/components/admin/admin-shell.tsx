'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { ClerkSignOutButton } from '@/components/auth/clerk-sign-out-button';
import { Logo } from '@/components/brand/logo';
import { BackToTop } from '@/components/shared/back-to-top';
import { WorkspaceUserIdentity } from '@/components/workspace/workspace-user-identity';
import {
  getAdminBreadcrumbs,
  getAdminNavSections,
  getAdminRouteMeta,
} from '@/lib/admin';
import type { WorkspaceUserDisplay } from '@/lib/auth/workspace-user';
import { siteConfig } from '@/lib/site';

type AdminShellProps = {
  children: React.ReactNode;
  user?: WorkspaceUserDisplay | null;
};

/**
 * Admin Workspace shell — Enterprise App Shell + admin navigation.
 */
export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const navSections = getAdminNavSections(pathname);
  const meta = getAdminRouteMeta(pathname);
  const breadcrumbs = getAdminBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      activePathname={pathname}
      linkComponent={Link}
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
          <ClerkSignOutButton
            redirectUrl="/login/admin"
            label="Sign out"
            fullWidth
            className="justify-start px-3 text-uv-foreground-muted hover:text-uv-error"
          />
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
        userMenu: (
          <WorkspaceUserIdentity
            user={user}
            signOutRedirectUrl="/login/admin"
          />
        ),
      }}
    >
      {children}
      <BackToTop scrollRootSelector="#workspace-main" />
    </EnterpriseAppShell>
  );
}
