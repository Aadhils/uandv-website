import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';

export type EmptyStateProps = {
  icon?: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

/**
 * Placeholder for empty lists, modules not yet wired, or zero-data states.
 */
export function EmptyState({
  icon = 'ClipboardList',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle px-6 py-12 text-center',
        className,
      )}
      role="status"
    >
      <span
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-uv-xl bg-uv-brand-muted text-uv-brand"
        aria-hidden
      >
        <Icon name={icon} size="md" />
      </span>
      <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-uv-foreground-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
