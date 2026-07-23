import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon } from '../icon';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
  /** Accessible name for the nav landmark */
  label?: string;
};

/**
 * Hierarchical page trail for workspace and admin surfaces.
 */
export function Breadcrumb({
  items,
  className,
  label = 'Breadcrumb',
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={label} className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <Icon
                  name="ChevronRight"
                  size="xs"
                  className="text-uv-foreground-subtle"
                  aria-hidden
                />
              ) : null}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="truncate text-uv-foreground-muted transition-colors hover:text-uv-brand uv-focus-ring rounded-uv-md px-0.5"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'truncate px-0.5',
                    isLast
                      ? 'font-medium text-uv-foreground'
                      : 'text-uv-foreground-muted',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
