'use client';

import Link from 'next/link';

import { Badge, Icon, cn } from '@uandv/ui';

import {
  getOperatingSnapshot,
  type BosJourneyStage,
} from '@/lib/business-os';

function formatStageDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso.slice(0, 10)}T12:00:00`));
}

function statusTone(status: BosJourneyStage['status']): string {
  if (status === 'completed') return 'bg-emerald-500';
  if (status === 'active') return 'bg-uv-brand';
  return 'bg-uv-border';
}

export function CustomerJourneyTimeline({
  stages: stagesProp,
}: {
  stages?: BosJourneyStage[];
} = {}) {
  const list = stagesProp ?? getOperatingSnapshot().journey;

  return (
    <section aria-labelledby="bos-journey-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <h2
            id="bos-journey-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
          >
            Customer Journey Timeline
          </h2>
          <p className="mt-1 text-sm text-uv-foreground-muted">
            Every completed stage across Discovery → Project on the shared demo
            spine.
          </p>
        </div>
        <Link
          href="/dashboard/timeline"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Lifetime timeline
        </Link>
      </div>

      <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
        {list.map((stage) => (
          <li key={stage.id} className="relative pb-6 last:pb-0">
            <span
              className={cn(
                'absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-background sm:-left-[1.55rem]',
                statusTone(stage.status),
              )}
              aria-hidden
            />
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Badge
                variant={
                  stage.status === 'completed'
                    ? 'default'
                    : stage.status === 'active'
                      ? 'secondary'
                      : 'outline'
                }
              >
                {stage.status === 'completed'
                  ? 'Completed'
                  : stage.status === 'active'
                    ? 'In progress'
                    : 'Upcoming'}
              </Badge>
              {stage.completedAt ? (
                <span className="text-xs text-uv-foreground-subtle">
                  {formatStageDate(stage.completedAt)}
                </span>
              ) : null}
            </div>
            <div className="mt-2 flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-uv-lg bg-uv-background-subtle text-uv-brand">
                <Icon name={stage.icon} size="sm" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-uv-foreground">
                  <Link
                    href={stage.href}
                    className="uv-focus-ring rounded-sm hover:underline"
                  >
                    {stage.label}
                  </Link>
                </h3>
                <p className="mt-1 break-words text-sm text-uv-foreground-muted">
                  {stage.description}
                </p>
                {stage.relatedId ? (
                  <p className="mt-1 text-xs text-uv-foreground-subtle">
                    {stage.relatedLabel ?? 'Ref'} · {stage.relatedId}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
