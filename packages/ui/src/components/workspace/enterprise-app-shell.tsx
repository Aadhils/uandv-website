'use client';

import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon } from '../icon';
import {
  WorkspaceSidebar,
  type WorkspaceNavSection,
} from './workspace-sidebar';
import {
  WorkspaceTopNav,
  type WorkspaceTopNavProps,
} from './workspace-top-nav';

export type EnterpriseAppShellProps = {
  brand: React.ReactNode;
  /** Compact brand for collapsed / mobile header strip */
  brandCollapsed?: React.ReactNode;
  navSections: WorkspaceNavSection[];
  sidebarFooter?: React.ReactNode;
  topNav: Omit<WorkspaceTopNavProps, 'onMenuClick'>;
  children: React.ReactNode;
  className?: string;
};

/**
 * Universal enterprise app shell — sidebar + top nav + main content.
 * Foundation for Customer, Vendor, Partner, Employee, and Admin workspaces.
 */
export function EnterpriseAppShell({
  brand,
  brandCollapsed,
  navSections,
  sidebarFooter,
  topNav,
  children,
  className,
}: EnterpriseAppShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const closeMobile = React.useCallback(() => setMobileOpen(false), []);

  const sidebar = (
    <WorkspaceSidebar
      brand={collapsed && !mobileOpen ? (brandCollapsed ?? brand) : brand}
      sections={navSections}
      footer={
        <div className="space-y-2">
          {(!collapsed || mobileOpen) && sidebarFooter ? sidebarFooter : null}
          <button
            type="button"
            className={cn(
              'hidden w-full items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium text-uv-foreground-muted transition-colors hover:bg-uv-background-muted hover:text-uv-foreground lg:flex uv-focus-ring',
              collapsed && 'justify-center px-2',
            )}
            onClick={() => setCollapsed((value) => !value)}
            aria-pressed={collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={collapsed ? 'ChevronRight' : 'ChevronLeft'}
              size="md"
            />
            {!collapsed ? <span>Collapse</span> : null}
          </button>
        </div>
      }
      collapsed={collapsed && !mobileOpen}
      onNavigate={closeMobile}
    />
  );

  return (
    <div className={cn('flex min-h-dvh bg-uv-background', className)}>
      {/* Desktop sidebar */}
      <div className="hidden shrink-0 lg:block">{sidebar}</div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-uv-overlay/50"
            aria-label="Close navigation"
            onClick={closeMobile}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)] shadow-uv-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Workspace navigation"
          >
            <WorkspaceSidebar
              brand={brand}
              sections={navSections}
              footer={sidebarFooter}
              collapsed={false}
              onNavigate={closeMobile}
              className="w-full"
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <WorkspaceTopNav
          {...topNav}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main
          id="workspace-main"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
