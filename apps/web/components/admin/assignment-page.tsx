'use client';

import Link from 'next/link';
import * as React from 'react';

import { Checkbox, Input, Select, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  comparePartners,
  demoPartners,
  getPartnerPerformance,
  searchPartners,
  type PartnerCategory,
} from '@/lib/partners';

export function AdminAssignmentPage() {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<string>('');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    let rows = searchPartners(query);
    if (category) {
      rows = rows.filter((p) => p.category === category);
    }
    return rows.filter((p) => p.verificationStatus !== 'rejected');
  }, [query, category]);

  const compared = comparePartners(selected);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 3
          ? prev
          : [...prev, id],
    );
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Smart Assignment"
        description="Search, compare, and assign partners by rating, performance, availability, and SLA. Demo actions only — no backend."
        actions={
          <Link
            href="/admin/partners"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Partner directory
          </Link>
        }
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground-muted"
          role="status"
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="assign-search" className="sr-only">
            Search partners
          </label>
          <Input
            id="assign-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partners…"
          />
        </div>
        <div>
          <label htmlFor="assign-category" className="sr-only">
            Filter category
          </label>
          <Select
            id="assign-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {(Object.keys(PARTNER_CATEGORY_LABELS) as PartnerCategory[]).map(
              (key) => (
                <option key={key} value={key}>
                  {PARTNER_CATEGORY_LABELS[key]}
                </option>
              ),
            )}
          </Select>
        </div>
      </div>

      <section aria-labelledby="compare-heading" className="space-y-3">
        <h2
          id="compare-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Compare (up to 3)
        </h2>
        {compared.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">
            Select partners below to compare ratings, performance, availability,
            and SLA.
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {compared.map((partner) => {
              const perf = getPartnerPerformance(partner.id);
              return (
                <div
                  key={partner.id}
                  className="rounded-uv-xl border border-uv-border p-4 space-y-2"
                >
                  <p className="font-semibold">{partner.companyName}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {PARTNER_CATEGORY_LABELS[partner.category]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={partner.verificationStatus} />
                    <StatusBadge status={partner.availability} />
                  </div>
                  <StatsCard
                    label="Rating"
                    value={partner.rating.toFixed(1)}
                    hint={`Perf ${partner.performanceScore} · SLA ${partner.slaHours}h`}
                    icon="Sparkles"
                  />
                  {perf ? (
                    <p className="text-xs text-uv-foreground-subtle">
                      On-time {perf.onTimeDeliveryPercent}% · Revisions{' '}
                      {perf.revisionCount}
                    </p>
                  ) : null}
                  <LocalDemoButton
                    onClick={() =>
                      setMessage(
                        `Demo: assigned ${partner.companyName} to selected project (not persisted).`,
                      )
                    }
                  >
                    Assign partner
                  </LocalDemoButton>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section aria-labelledby="search-results-heading" className="space-y-3">
        <h2
          id="search-results-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Search results ({filtered.length})
        </h2>
        <ul className="space-y-2">
          {filtered.map((partner) => (
            <li
              key={partner.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-2.5"
            >
              <label className="flex items-start gap-3 text-sm">
                <Checkbox
                  checked={selected.includes(partner.id)}
                  onChange={() => toggle(partner.id)}
                  aria-label={`Select ${partner.companyName}`}
                />
                <span>
                  <span className="font-medium">{partner.companyName}</span>
                  <span className="block text-xs text-uv-foreground-muted">
                    {PARTNER_CATEGORY_LABELS[partner.category]} · {partner.city}{' '}
                    · ★ {partner.rating.toFixed(1)} · SLA {partner.slaHours}h
                  </span>
                </span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={partner.availability} />
                <Link
                  href={`/admin/partners/${partner.id}`}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
                >
                  Profile
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-uv-foreground-subtle">
          Directory size {demoPartners.length} · rejected partners hidden from
          assignment.
        </p>
      </section>
    </div>
  );
}
