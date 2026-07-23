'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  formatPartnerDate,
  getDemoPartnerReviews,
  getPartnerById,
  getPartnerPerformance,
  subscribePartnerRuntime,
} from '@/lib/partners';

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function usePartner(partnerId: string) {
  return useSyncExternalStore(
    subscribePartnerRuntime,
    () => getPartnerById(partnerId) ?? null,
    () => getPartnerById(partnerId) ?? null,
  );
}

/**
 * Public Partner Profile — Sprint 3.1.1.
 * Reuses Release 3.6 Partner fields + demo ratings/reviews.
 */
export function PartnerPublicProfilePage({ partnerId }: { partnerId: string }) {
  const isClient = useIsClient();
  const partner = usePartner(partnerId);
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get('registered') === '1';

  if (!isClient) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-uv-foreground-muted sm:px-6">
        Loading partner profile…
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold">
          Partner not found
        </h1>
        <p className="mt-2 text-sm text-uv-foreground-muted">
          This partner is not in the demo marketplace directory.
        </p>
        <Link
          href="/partners"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-6 inline-flex')}
        >
          Back to partners
        </Link>
      </div>
    );
  }

  const performance = getPartnerPerformance(partner.id);
  const reviews = getDemoPartnerReviews(partner);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Sprint 3.1.1 · Public profile</Badge>
          <StatusBadge status={partner.verificationStatus} />
          <StatusBadge status={partner.availability} />
        </div>
        {justRegistered ? (
          <p
            className="rounded-uv-lg border border-uv-brand/30 bg-uv-brand/10 px-3 py-2 text-sm text-uv-foreground"
            role="status"
          >
            Registration received. Your profile is pending admin approval.
          </p>
        ) : null}
        <p className="text-xs uppercase tracking-[0.14em] text-uv-foreground-subtle">
          {PARTNER_CATEGORY_LABELS[partner.category]} · {partner.id}
        </p>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
          {partner.companyName}
        </h1>
        <p className="max-w-2xl text-sm text-uv-foreground-muted sm:text-base">
          {partner.summary}
        </p>
        <p className="text-sm text-uv-foreground-muted">
          {partner.contactPerson} · {partner.city}, {partner.state} ·{' '}
          {partner.serviceArea}
        </p>
      </header>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Profile metrics"
      >
        <StatsCard
          label="Demo rating"
          value={partner.rating > 0 ? partner.rating.toFixed(1) : '—'}
          icon="Sparkles"
        />
        <StatsCard
          label="Performance"
          value={String(partner.performanceScore)}
          hint="Score / 100"
          icon="TrendingUp"
        />
        <StatsCard
          label="Experience"
          value={`${partner.experienceYears} yrs`}
          icon="Briefcase"
        />
        <StatsCard
          label="SLA"
          value={`${partner.slaHours}h`}
          hint="Response target"
          icon="Clock"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-uv-xl border border-uv-border p-5">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Skills & coverage
          </h2>
          <div className="flex flex-wrap gap-2">
            {partner.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Commission</dt>
              <dd className="capitalize">{partner.commissionType}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Documents</dt>
              <dd>
                <StatusBadge status={partner.documentsStatus} />
              </dd>
            </div>
          </dl>
          {performance ? (
            <p className="text-sm text-uv-foreground-muted">
              On-time {performance.onTimeDeliveryPercent}% · Avg response{' '}
              {performance.responseTimeHours}h · Satisfaction{' '}
              {performance.customerSatisfaction}%
            </p>
          ) : null}
        </section>

        <section className="space-y-3 rounded-uv-xl border border-uv-border p-5">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Demo ratings & reviews
          </h2>
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-uv-lg border border-uv-border/80 bg-uv-background-subtle px-3 py-2.5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-uv-foreground">{review.author}</p>
                  <span className="text-xs text-uv-foreground-subtle">
                    ★ {review.rating.toFixed(1)} ·{' '}
                    {formatPartnerDate(review.occurredAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  {review.comment}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/partners" className={cn(buttonVariants({ variant: 'outline' }))}>
          Back to directory
        </Link>
        <Link href="/marketplace" className={cn(buttonVariants({ variant: 'outline' }))}>
          Browse services
        </Link>
        <Link
          href={`/admin/partners/${partner.id}`}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          Admin profile
        </Link>
      </div>
    </div>
  );
}
