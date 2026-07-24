import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export type WorkspaceNavItem = {
  label: string;
  href: string;
  icon?: IconName;
  active?: boolean;
  disabled?: boolean;
};

export type WorkspaceNavSection = {
  id: string;
  title?: string;
  items: WorkspaceNavItem[];
};

export type WorkspaceSidebarProps = {
  brand: React.ReactNode;
  sections: WorkspaceNavSection[];
  footer?: React.ReactNode;
  collapsed?: boolean;
  className?: string;
  /** Called when a nav link is activated (e.g. close mobile drawer) */
  onNavigate?: () => void;
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
}: WorkspaceSidebarProps) {
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
                const content = (
                  <>
                    {item.icon ? (
                      <Icon name={item.icon} size="md" className="shrink-0" />
                    ) : null}
                    {!collapsed ? (
                      <span className="truncate">{item.label}</span>
                    ) : null}
                  </>
                );

                const itemClassName = cn(
                  'flex min-h-11 w-full items-center gap-3 rounded-uv-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 uv-focus-ring',
                  item.active
                    ? 'bg-uv-brand-muted text-uv-brand'
                    : 'text-uv-foreground-muted hover:bg-uv-background-muted hover:text-uv-foreground',
                  item.disabled && 'pointer-events-none opacity-50',
                  collapsed && 'justify-center px-2',
                );

                return (
                  <li key={`${section.id}-${item.href}-${item.label}`}>
                    {item.disabled ? (
                      <span
                        className={itemClassName}
                        title={collapsed ? item.label : undefined}
                        aria-disabled="true"
                      >
                        {content}
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        aria-current={item.active ? 'page' : undefined}
                        title={collapsed ? item.label : undefined}
                        className={itemClassName}
                        onClick={onNavigate}
                      >
                        {content}
                      </a>
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
