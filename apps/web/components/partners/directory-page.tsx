'use client';

import Link from 'next/link';
import * as React from 'react';

import { Badge, Input, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  partnerDirectoryStats,
  searchPartners,
} from '@/lib/partners';

/**
 * Public / shared Partner Directory at /partners.
 * Browse verified ecosystem partners — demo data only.
 */
export function PartnersDirectoryPage() {
  const [query, setQuery] = React.useState('');
  const stats = partnerDirectoryStats();
  const rows = React.useMemo(
    () =>
      searchPartners(query).filter(
        (p) =>
          p.verificationStatus === 'verified' ||
          p.verificationStatus === 'pending',
      ),
    [query],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge variant="warning">Release 3.6 · Demo directory</Badge>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Partner Network
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          Browse U&amp;V ecosystem partners across compliance, brand, technology,
          and growth services. Ratings and verification are demo placeholders —
          not live credentials.
        </p>
      </header>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Directory metrics"
      >
        <StatsCard label="Listed partners" value={String(rows.length)} icon="Users" />
        <StatsCard label="Verified" value={String(stats.verified)} icon="Check" />
        <StatsCard
          label="Categories"
          value={String(stats.categories)}
          icon="Layers"
        />
        <StatsCard
          label="Available now"
          value={String(stats.available)}
          icon="Sparkles"
        />
      </section>

      <div className="max-w-md">
        <label htmlFor="partners-dir-search" className="sr-only">
          Search partners
        </label>
        <Input
          id="partners-dir-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search category, city, skills…"
        />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {rows.map((partner) => (
          <li
            key={partner.id}
            className="rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs text-uv-foreground-subtle">
                  {PARTNER_CATEGORY_LABELS[partner.category]}
                </p>
                <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
                  {partner.companyName}
                </h2>
                <p className="text-sm text-uv-foreground-muted">
                  {partner.city}, {partner.state} · {partner.serviceArea}
                </p>
              </div>
              <StatusBadge status={partner.verificationStatus} />
            </div>
            <p className="mt-3 text-sm text-uv-foreground-muted">
              {partner.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {partner.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-xs text-uv-foreground-subtle">
              ★ {partner.rating.toFixed(1)} · Perf {partner.performanceScore} ·{' '}
              {partner.experienceYears} yrs · SLA {partner.slaHours}h
            </p>
            <div className="mt-4">
              <StatusBadge status={partner.availability} />
            </div>
          </li>
        ))}
      </ul>

      <p className="text-sm text-uv-foreground-muted">
        Admins manage partners in{' '}
        <Link
          href="/admin/partners"
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'h-auto px-0',
          )}
        >
          Admin Partner Network
        </Link>
        .
      </p>
    </div>
  );
}
