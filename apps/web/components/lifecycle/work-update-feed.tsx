import { Badge, cn } from '@uandv/ui';

import {
  formatDisplayDate,
  type WorkUpdate,
  type WorkUpdateKind,
} from '@/lib/customer';

const kindLabels: Record<WorkUpdateKind, string> = {
  progress: 'Progress',
  milestone: 'Milestone',
  blocker: 'Blocker',
  delivery: 'Delivery',
  note: 'Note',
};

const kindVariants: Record<
  WorkUpdateKind,
  'default' | 'secondary' | 'warning' | 'success' | 'info' | 'error'
> = {
  progress: 'info',
  milestone: 'default',
  blocker: 'warning',
  delivery: 'success',
  note: 'secondary',
};

export type WorkUpdateFeedProps = {
  updates: WorkUpdate[];
  className?: string;
  emptyMessage?: string;
};

/** Reusable chronological work updates feed. */
export function WorkUpdateFeed({
  updates,
  className,
  emptyMessage = 'No work updates yet.',
}: WorkUpdateFeedProps) {
  if (updates.length === 0) {
    return (
      <p
        className={cn(
          'rounded-uv-xl border border-dashed border-uv-border px-4 py-10 text-center text-sm text-uv-foreground-muted',
          className,
        )}
        role="status"
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={cn('space-y-3', className)} role="list">
      {updates.map((update) => (
        <li
          key={update.id}
          className="rounded-uv-xl border border-uv-border bg-uv-card p-4 shadow-uv-sm sm:p-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={kindVariants[update.kind]}>
              {kindLabels[update.kind]}
            </Badge>
            <Badge variant="outline">{update.projectName}</Badge>
            <span className="text-xs text-uv-foreground-subtle">
              {formatDisplayDate(update.occurredAt)}
            </span>
          </div>
          <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
            {update.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted">
            {update.body}
          </p>
          <p className="mt-2 text-xs text-uv-foreground-subtle">
            Posted by {update.author}
          </p>
        </li>
      ))}
    </ul>
  );
}
