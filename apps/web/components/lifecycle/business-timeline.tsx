import { Badge } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatLifecycleDateTime,
  type BusinessTimelineEvent,
} from '@/lib/lifecycle';

export type BusinessTimelineProps = {
  events: BusinessTimelineEvent[];
  emptyMessage?: string;
  showVisibility?: boolean;
};

/** Shared lifetime / project timeline with role-filtered events. */
export function BusinessTimeline({
  events,
  emptyMessage = 'No timeline events visible for your role.',
  showVisibility = false,
}: BusinessTimelineProps) {
  if (events.length === 0) {
    return <p className="text-sm text-uv-foreground-muted">{emptyMessage}</p>;
  }

  return (
    <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
      {events.map((event, index) => (
        <li key={event.id} className="relative pb-6 last:pb-0">
          <span
            className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{event.kind.replaceAll('_', ' ')}</Badge>
            {showVisibility ? <StatusBadge status={event.visibility} /> : null}
            {index === 0 ? <Badge variant="default">Latest</Badge> : null}
            <span className="text-xs text-uv-foreground-subtle">
              {formatLifecycleDateTime(event.occurredAt)}
            </span>
          </div>
          <p className="mt-2 font-semibold text-uv-foreground">{event.title}</p>
          <p className="mt-1 text-sm text-uv-foreground-muted">
            {event.description}
          </p>
          <p className="mt-1 text-xs text-uv-foreground-subtle">
            {event.actorName}
            {event.projectTitle ? ` · ${event.projectTitle}` : ''}
          </p>
        </li>
      ))}
    </ol>
  );
}
