'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import { EnterpriseAppShell, buttonVariants, cn } from '@uandv/ui';

import { ClerkSignOutButton } from '@/components/auth/clerk-sign-out-button';
import { Logo } from '@/components/brand/logo';
import { BackToTop } from '@/components/shared/back-to-top';
import { WorkspaceUserIdentity } from '@/components/workspace/workspace-user-identity';
import {
  getCustomerBreadcrumbs,
  getCustomerNavSections,
  getCustomerRouteMeta,
} from '@/lib/customer';
import type { WorkspaceUserDisplay } from '@/lib/auth/workspace-user';
import { siteConfig } from '@/lib/site';

type WorkspaceShellProps = {
  children: React.ReactNode;
  user?: WorkspaceUserDisplay | null;
};

function WorkspaceNavLink({
  href,
  children,
  ...props
}: ComponentProps<'a'> & { href: string }) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

/**
 * Customer Workspace shell — reuses Enterprise App Shell with customer nav.
 */
export function WorkspaceShell({ children, user }: WorkspaceShellProps) {
  const pathname = usePathname();
  const navSections = getCustomerNavSections(pathname);
  const meta = getCustomerRouteMeta(pathname);
  const breadcrumbs = getCustomerBreadcrumbs(pathname);

  return (
    <EnterpriseAppShell
      activePathname={pathname}
      linkComponent={WorkspaceNavLink}
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
          <ClerkSignOutButton
            redirectUrl="/login"
            label="Sign out"
            fullWidth
            className="justify-start px-3 text-uv-foreground-muted hover:text-uv-error"
          />
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
            signOutRedirectUrl="/login"
            profileHref="/dashboard/profile"
          />
        ),
      }}
    >
      {children}
      <BackToTop scrollRootSelector="#workspace-main" />
    </EnterpriseAppShell>
  );
}
