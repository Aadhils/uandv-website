'use client';

import Link from 'next/link';

import { Badge, buttonVariants, cn } from '@uandv/ui';

import {
  formatBudgetRange,
  formatServiceRequestInr,
  partnerCategoryLabel,
  serviceRequestStatusLabel,
  type PartnerMatchResult,
  type ServiceRequest,
  type ServiceRequestEvent,
} from '@/lib/service-requests';
import { StatusBadge } from '@/components/customer/status-badge';

export function MatchBreakdownCard({ match }: { match: PartnerMatchResult }) {
  const rows: Array<[string, number]> = [
    ['Service match', match.breakdown.service],
    ['Location match', match.breakdown.location],
    ['Availability match', match.breakdown.availability],
    ['Performance match', match.breakdown.performance],
    ['Budget match', match.breakdown.budget],
  ];

  return (
    <article className="rounded-uv-xl border border-uv-border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-uv-foreground-subtle">
            {partnerCategoryLabel(match.category)} · {match.city}
          </p>
          <h3 className="font-semibold text-uv-foreground">
            <Link
              href={`/partners/${match.partnerId}`}
              className="uv-focus-ring rounded-sm hover:underline"
            >
              {match.companyName}
            </Link>
          </h3>
        </div>
        <Badge variant="default">
          Overall {match.breakdown.overall}
        </Badge>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map(([label, score]) => (
          <li key={label} className="text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-uv-foreground-muted">{label}</span>
              <span className="tabular-nums font-medium">{score}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-uv-border/70">
              <div
                className="h-full rounded-full bg-uv-brand"
                style={{ width: `${score}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-3 space-y-1 text-xs text-uv-foreground-muted">
        {match.reasons.map((reason) => (
          <li key={reason}>· {reason}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-uv-foreground-subtle">
        ★ {match.rating.toFixed(1)} · Perf {match.performanceScore} ·{' '}
        {match.experienceYears} yrs
        {match.estimatedPriceInr
          ? ` · Est. ${formatServiceRequestInr(match.estimatedPriceInr)}`
          : ''}
      </p>
    </article>
  );
}

export function PartnerComparePanel({
  matches,
}: {
  matches: PartnerMatchResult[];
}) {
  const rows = matches.slice(0, 3);
  if (!rows.length) {
    return (
      <p className="text-sm text-uv-foreground-muted">
        No partners selected for comparison.
      </p>
    );
  }

  const fields: Array<{
    label: string;
    value: (m: PartnerMatchResult) => string;
  }> = [
    { label: 'Match score', value: (m) => String(m.breakdown.overall) },
    { label: 'Rating', value: (m) => m.rating.toFixed(1) },
    { label: 'Experience', value: (m) => `${m.experienceYears} yrs` },
    { label: 'Service area / city', value: (m) => m.city },
    {
      label: 'Estimated price',
      value: (m) =>
        m.estimatedPriceInr
          ? formatServiceRequestInr(m.estimatedPriceInr)
          : '—',
    },
    {
      label: 'Estimated duration',
      value: (m) =>
        m.estimatedDurationDays ? `${m.estimatedDurationDays} days` : '—',
    },
    { label: 'Availability', value: (m) => m.availability },
    { label: 'Verification', value: (m) => m.verificationStatus },
    {
      label: 'Performance',
      value: (m) => String(m.performanceScore),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-uv-xl border border-uv-border">
      <table className="min-w-[640px] w-full text-left text-sm">
        <thead className="bg-uv-background-subtle">
          <tr>
            <th className="px-3 py-2 font-medium">Factor</th>
            {rows.map((m) => (
              <th key={m.partnerId} className="px-3 py-2 font-medium">
                {m.companyName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.label} className="border-t border-uv-border">
              <td className="px-3 py-2 text-uv-foreground-muted">{field.label}</td>
              {rows.map((m) => (
                <td key={m.partnerId} className="px-3 py-2">
                  {field.value(m)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ServiceRequestTimeline({
  events,
}: {
  events: ServiceRequestEvent[];
}) {
  if (!events.length) {
    return (
      <p className="text-sm text-uv-foreground-muted">No timeline events yet.</p>
    );
  }
  return (
    <ol className="relative space-y-0 border-l border-uv-border pl-5">
      {events.map((event) => (
        <li key={event.id} className="relative pb-5 last:pb-0">
          <span
            className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-background bg-uv-brand"
            aria-hidden
          />
          <p className="text-xs text-uv-foreground-subtle">
            {new Date(event.occurredAt).toLocaleString('en-IN')} ·{' '}
            {event.actorName}
          </p>
          <p className="font-medium text-uv-foreground">{event.title}</p>
          <p className="text-sm text-uv-foreground-muted">{event.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function ServiceRequestSummaryCard({
  request,
  href,
}: {
  request: ServiceRequest;
  href: string;
}) {
  return (
    <li className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-xs text-uv-foreground-subtle">
            {request.id}
          </p>
          <h3 className="font-semibold">
            <Link href={href} className="uv-focus-ring rounded-sm hover:underline">
              {request.requestedService}
            </Link>
          </h3>
          <p className="text-sm text-uv-foreground-muted">
            {request.city}, {request.state} ·{' '}
            {formatBudgetRange(request.budgetMinInr, request.budgetMaxInr)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={request.priority} />
          <Badge variant="secondary">
            {serviceRequestStatusLabel(request.status)}
          </Badge>
        </div>
      </div>
      <div className="mt-auto pt-3">
        <Link href={href} className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
          Open
        </Link>
      </div>
    </li>
  );
}
