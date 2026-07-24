'use client';

import Link from 'next/link';

import { Badge, Icon, cn } from '@uandv/ui';

import {
  getOperatingSnapshot,
  type BosSmartAction,
} from '@/lib/business-os';

export function SmartActionCenter({
  actions: actionsProp,
}: {
  actions?: BosSmartAction[];
} = {}) {
  const list = actionsProp ?? getOperatingSnapshot().smartActions;

  return (
    <section aria-labelledby="smart-actions-heading" className="space-y-4">
      <div>
        <h2
          id="smart-actions-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
        >
          Smart Action Center
        </h2>
        <p className="mt-1 text-sm text-uv-foreground-muted">
          Next best steps from your live journey status across connected
          modules.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              'group flex min-w-0 flex-col gap-2 rounded-uv-xl border border-uv-border bg-uv-background p-4 transition-colors',
              'hover:border-uv-brand/40 hover:bg-uv-background-subtle uv-focus-ring',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-uv-lg bg-uv-brand/10 text-uv-brand">
                <Icon name={action.icon} size="sm" />
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {action.badge ? (
                  <Badge variant="secondary">{action.badge}</Badge>
                ) : null}
                <Badge variant="outline" className="capitalize">
                  {action.priority}
                </Badge>
              </div>
            </div>
            <p className="font-semibold text-uv-foreground group-hover:text-uv-brand">
              {action.title}
            </p>
            <p className="break-words text-sm text-uv-foreground-muted">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
