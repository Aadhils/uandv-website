import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { PlaceholderAction } from '@/components/customer/placeholder-action';
import {
  formatDisplayDate,
  type SupportTicket,
} from '@/lib/customer';

type SupportSummarySectionProps = {
  tickets: SupportTicket[];
};

export function SupportSummarySection({
  tickets,
}: SupportSummarySectionProps) {
  const open = tickets.filter(
    (ticket) => ticket.status === 'open' || ticket.status === 'in_progress',
  ).length;
  const waiting = tickets.filter((ticket) => ticket.status === 'waiting').length;
  const resolved = tickets.filter(
    (ticket) => ticket.status === 'resolved' || ticket.status === 'closed',
  ).length;
  const latest =
    [...tickets].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] ??
    null;

  return (
    <section aria-labelledby="support-summary-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="support-summary-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
        >
          Support Summary
        </h2>
        <Link
          href="/dashboard/support"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          Support Center
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard label="Open tickets" value={String(open)} icon="MessageCircle" />
        <StatsCard
          label="Waiting for customer"
          value={String(waiting)}
          icon="Clock"
        />
        <StatsCard
          label="Resolved tickets"
          value={String(resolved)}
          icon="Check"
        />
      </div>

      {latest ? (
        <Card padding="none">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Latest response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <p className="text-sm font-medium text-uv-foreground">
              {latest.subject}
            </p>
            <p className="text-sm text-uv-foreground-muted">
              {latest.conversationPreview}
            </p>
            <p className="text-xs text-uv-foreground-subtle">
              Updated {formatDisplayDate(latest.updatedAt)} · {latest.id}
            </p>
            <div className="flex flex-wrap gap-2">
              <PlaceholderAction>Create ticket</PlaceholderAction>
              <Link
                href="/dashboard/support"
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                View tickets
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </section>
  );
}
