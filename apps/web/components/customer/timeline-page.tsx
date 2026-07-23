import { Badge } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { demoTimeline, formatDisplayDate } from '@/lib/customer';

export function CustomerTimelinePage() {
  const events = [...demoTimeline].sort((a, b) =>
    a.occurredAt.localeCompare(b.occurredAt),
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Business Timeline"
        description="Chronological customer journey with U&V. Static demo events only."
      />

      <ol className="relative space-y-0 border-l border-uv-border pl-6">
        {events.map((event, index) => (
          <li key={event.id} className="relative pb-8 last:pb-0">
            <span
              className="absolute -left-[1.625rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-uv-brand bg-uv-background"
              aria-hidden
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{formatDisplayDate(event.occurredAt)}</Badge>
                {index === events.length - 1 ? (
                  <Badge variant="default">Latest</Badge>
                ) : null}
              </div>
              <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                {event.title}
              </h3>
              <p className="text-sm leading-relaxed text-uv-foreground-muted">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
