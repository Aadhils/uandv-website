import * as React from 'react';

import { cn } from '../../lib/cn';
import { Icon, type IconName } from '../icon';
import { Card, CardContent } from '../card';

export type StatsCardProps = {
  label: string;
  value: string;
  hint?: string;
  trend?: string;
  icon?: IconName;
  className?: string;
};

/**
 * Compact metric tile for workspace dashboards.
 */
export function StatsCard({
  label,
  value,
  hint,
  trend,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card
      variant="default"
      padding="none"
      className={cn('h-full', className)}
    >
      <CardContent className="flex h-full flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-uv-foreground-muted">{label}</p>
          {icon ? (
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand"
              aria-hidden
            >
              <Icon name={icon} size="sm" />
            </span>
          ) : null}
        </div>
        <p className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold tracking-tight text-uv-foreground sm:text-3xl">
          {value}
        </p>
        {trend || hint ? (
          <div className="mt-auto space-y-0.5">
            {trend ? (
              <p className="text-sm font-medium text-uv-brand">{trend}</p>
            ) : null}
            {hint ? (
              <p className="text-xs text-uv-foreground-subtle">{hint}</p>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
