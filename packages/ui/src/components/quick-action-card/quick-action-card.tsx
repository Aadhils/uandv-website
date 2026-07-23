import * as React from 'react';

import { cn } from '../../lib/cn';
import { Badge } from '../badge';
import { Card, CardContent } from '../card';
import { Icon, type IconName } from '../icon';

export type QuickActionCardProps = {
  title: string;
  description: string;
  icon: IconName;
  href?: string;
  disabled?: boolean;
  badge?: string;
  className?: string;
};

/**
 * Compact action tile for dashboard shortcuts and future workspace entry points.
 */
export function QuickActionCard({
  title,
  description,
  icon,
  href,
  disabled = false,
  badge,
  className,
}: QuickActionCardProps) {
  const content = (
    <Card
      variant="default"
      padding="none"
      interactive={!disabled && Boolean(href)}
      className={cn(
        'h-full',
        disabled && 'opacity-70',
        className,
      )}
    >
      <CardContent className="flex h-full gap-4 p-5">
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand"
          aria-hidden
        >
          <Icon name={icon} size="md" />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
              {title}
            </h3>
            {badge ? (
              <Badge variant="secondary">{badge}</Badge>
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-uv-foreground-muted">
            {description}
          </p>
        </div>
        {!disabled && href ? (
          <Icon
            name="ArrowRight"
            size="sm"
            className="mt-1 shrink-0 text-uv-foreground-subtle"
            aria-hidden
          />
        ) : null}
      </CardContent>
    </Card>
  );

  if (disabled || !href) {
    return (
      <div
        className="h-full"
        aria-disabled={disabled || undefined}
      >
        {content}
      </div>
    );
  }

  return (
    <a href={href} className="block h-full uv-focus-ring rounded-uv-xl">
      {content}
    </a>
  );
}
