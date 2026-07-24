import Link from 'next/link';

import { Badge } from '@uandv/ui';

import {
  formatDisplayDate,
  type TimelineEvent,
} from '@/lib/customer';

type CustomerJourneySectionProps = {
  events: TimelineEvent[];
};

export function CustomerJourneySection({
  events,
}: CustomerJourneySectionProps) {
  const ordered = [...events].sort((a, b) =>
    a.occurredAt.localeCompare(b.occurredAt),
  );

  return (
    <section aria-labelledby="journey-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="journey-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
        >
          Customer Journey Timeline
        </h2>
        <Link
          href="/dashboard/timeline"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Full timeline
        </Link>
      </div>

      <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
        {ordered.map((event, index) => (
          <li key={event.id} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {formatDisplayDate(event.occurredAt)}
              </Badge>
              {index === ordered.length - 1 ? (
                <Badge variant="default">Latest</Badge>
              ) : null}
            </div>
            <h3 className="mt-2 font-semibold text-uv-foreground">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
