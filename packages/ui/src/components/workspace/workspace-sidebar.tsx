import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export type WorkspaceNavItem = {
  label: string;
  href: string;
  icon?: IconName;
  active?: boolean;
  disabled?: boolean;
  /** Shown beside disabled items, e.g. "Coming soon". */
  statusLabel?: string;
};

export type WorkspaceNavSection = {
  id: string;
  title?: string;
  items: WorkspaceNavItem[];
};

type SidebarLinkProps = {
  href: string;
  className?: string;
  title?: string;
  'aria-current'?: 'page' | undefined;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
};

export type WorkspaceSidebarProps = {
  brand: React.ReactNode;
  sections: WorkspaceNavSection[];
  footer?: React.ReactNode;
  collapsed?: boolean;
  className?: string;
  /** Called when a nav link is activated (e.g. close mobile drawer) */
  onNavigate?: () => void;
  /**
   * Optional link component (e.g. next/link). Must accept `href` + anchor props.
   * Defaults to a native `<a>` for package isolation.
   */
  linkComponent?: React.ElementType<SidebarLinkProps>;
};

/**
 * Enterprise workspace sidebar with grouped placeholder navigation.
 */
export function WorkspaceSidebar({
  brand,
  sections,
  footer,
  collapsed = false,
  className,
  onNavigate,
  linkComponent,
}: WorkspaceSidebarProps) {
  const LinkComponent = linkComponent ?? 'a';

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-uv-border bg-uv-background-subtle',
        collapsed ? 'w-[4.5rem]' : 'w-64',
        className,
      )}
      aria-label="Workspace navigation"
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-uv-border px-4',
          collapsed && 'justify-center px-2',
        )}
      >
        {brand}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-3" aria-label="Primary">
        {sections.map((section) => (
          <div key={section.id} className="space-y-1">
            {section.title && !collapsed ? (
              <p className="uv-overline px-3 pb-1 text-uv-foreground-subtle">
                {section.title}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const statusTitle = item.statusLabel
                  ? `${item.label} — ${item.statusLabel}`
                  : item.label;

                const content = (
                  <>
                    {item.disabled ? (
                      <Icon
                        name="Lock"
                        size="md"
                        className="shrink-0 opacity-50"
                      />
                    ) : item.icon ? (
                      <Icon name={item.icon} size="md" className="shrink-0" />
                    ) : null}
                    {!collapsed ? (
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span
                            className={cn(
                              'truncate',
                              item.disabled && 'text-uv-foreground-subtle',
                            )}
                          >
                            {item.label}
                          </span>
                          {item.disabled && item.statusLabel ? (
                            <span className="inline-flex w-fit rounded-uv-md border border-uv-border bg-uv-background-muted px-1.5 py-0.5 text-[10px] font-medium text-uv-foreground-subtle">
                              {item.statusLabel}
                            </span>
                          ) : null}
                        </span>
                      </span>
                    ) : null}
                  </>
                );

                const itemClassName = cn(
                  'flex min-h-11 w-full items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 uv-focus-ring',
                  item.active
                    ? 'bg-uv-brand-muted text-uv-brand'
                    : item.disabled
                      ? 'cursor-not-allowed text-uv-foreground-subtle'
                      : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground',
                  item.disabled && 'pointer-events-none select-none opacity-70',
                  collapsed && 'justify-center px-2',
                );

                return (
                  <li key={`${section.id}-${item.href}-${item.label}`}>
                    {item.disabled ? (
                      <span
                        className={itemClassName}
                        title={collapsed ? statusTitle : statusTitle}
                        aria-disabled="true"
                      >
                        {content}
                      </span>
                    ) : (
                      <LinkComponent
                        href={item.href}
                        aria-current={item.active ? 'page' : undefined}
                        title={collapsed ? item.label : undefined}
                        className={itemClassName}
                        onClick={onNavigate}
                      >
                        {content}
                      </LinkComponent>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer ? (
        <div
          className={cn(
            'shrink-0 border-t border-uv-border p-3',
            collapsed && 'px-2',
          )}
        >
          {footer}
        </div>
      ) : null}
    </aside>
  );
}
