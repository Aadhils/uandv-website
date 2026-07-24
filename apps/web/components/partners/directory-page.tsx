'use client';

import Link from 'next/link';
import * as React from 'react';

import {
  Badge,
  Input,
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import {
  PARTNER_CATEGORY_LABELS,
  filterPartners,
  getPublicDirectoryPartnersClientSnapshot,
  getPublicDirectoryPartnersServerSnapshot,
  listPartnerCategorySummaries,
  listPartnerCities,
  partnerDirectoryStatsFrom,
  subscribePublicDirectoryPartners,
  type PartnerCategory,
  type PartnerDirectoryFilters,
} from '@/lib/partners';
import { useViewMode, viewModeLayoutClass } from '@/lib/ui/use-view-mode';

function useDirectoryPartners() {
  return React.useSyncExternalStore(
    subscribePublicDirectoryPartners,
    getPublicDirectoryPartnersClientSnapshot,
    getPublicDirectoryPartnersServerSnapshot,
  );
}

/**
 * Public Partner Marketplace directory — extends Release 3.6 /partners.
 * Search, category chips, rating/city filters, profile links.
 */
export function PartnersDirectoryPage() {
  const partners = useDirectoryPartners();
  const stats = React.useMemo(
    () => partnerDirectoryStatsFrom(partners),
    [partners],
  );
  const categories = listPartnerCategorySummaries(partners);
  const cities = listPartnerCities(partners);

  const [filters, setFilters] = React.useState<PartnerDirectoryFilters>({
    query: '',
    category: 'all',
    city: 'all',
    minRating: 0,
    verification: 'all',
  });

  const rows = React.useMemo(
    () => filterPartners(partners, filters),
    [partners, filters],
  );
  const [view, setView] = useViewMode('partners', 'grid');

  const setCategory = (category: PartnerCategory | 'all') => {
    setFilters((prev) => ({ ...prev, category }));
  };

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge variant="warning">Sprint 3.1.1 · Partner Marketplace</Badge>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Partner Marketplace
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          Browse U&amp;V ecosystem partners across compliance, brand, technology,
          and growth. Extends the Version 3.0 Business OS partner spine — demo
          ratings and verification only.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/partners/register"
            className={cn(buttonVariants({ size: 'sm' }))}
          >
            Register as partner
          </Link>
          <Link
            href="/marketplace"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Service marketplace
          </Link>
        </div>
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

      <section aria-labelledby="partner-categories-heading" className="space-y-3">
        <h2
          id="partner-categories-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Partner categories
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: filters.category === 'all' ? 'primary' : 'outline',
              }),
            )}
          >
            All
          </button>
          {categories
            .filter((c) => c.count > 0)
            .map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategory(category.id)}
                className={cn(
                  buttonVariants({
                    size: 'sm',
                    variant:
                      filters.category === category.id ? 'primary' : 'outline',
                  }),
                )}
              >
                {category.label} ({category.count})
              </button>
            ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label htmlFor="partners-dir-search" className="sr-only">
              Search partners
            </label>
            <Input
              id="partners-dir-search"
              type="search"
              value={filters.query ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, query: e.target.value }))
              }
              placeholder="Search category, city, skills…"
            />
          </div>
          <div>
            <label htmlFor="partners-city" className="sr-only">
              Filter by city
            </label>
            <select
              id="partners-city"
              value={filters.city ?? 'all'}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
              className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
            >
              <option value="all">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="partners-rating" className="sr-only">
              Minimum rating
            </label>
            <select
              id="partners-rating"
              value={String(filters.minRating ?? 0)}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: Number(e.target.value),
                }))
              }
              className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
            >
              <option value="0">Any rating</option>
              <option value="3">3.0+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>
        <ViewModeToggle
          value={view}
          onChange={setView}
          label="Partner directory layout"
        />
      </div>

      <ul
        className={
          view === 'grid' ? viewModeLayoutClass.grid : viewModeLayoutClass.list
        }
      >
        {rows.map((partner) => (
          <li
            key={partner.id}
            className={cn(
              'rounded-uv-xl border border-uv-border p-4 sm:p-5',
              view === 'list' &&
                'sm:flex sm:items-start sm:justify-between sm:gap-6',
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-uv-foreground-subtle">
                    {PARTNER_CATEGORY_LABELS[partner.category]}
                  </p>
                  <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
                    <Link
                      href={`/partners/${partner.id}`}
                      className="uv-focus-ring rounded-sm hover:underline"
                    >
                      {partner.companyName}
                    </Link>
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
                ★ {partner.rating.toFixed(1)} demo rating · Perf{' '}
                {partner.performanceScore} · {partner.experienceYears} yrs · SLA{' '}
                {partner.slaHours}h
              </p>
            </div>
            <div
              className={cn(
                'mt-4 flex flex-wrap items-center gap-2',
                view === 'list' && 'sm:mt-0 sm:shrink-0 sm:flex-col sm:items-end',
              )}
            >
              <StatusBadge status={partner.availability} />
              <Link
                href={`/partners/${partner.id}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                View profile
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {rows.length === 0 ? (
        <p className="text-sm text-uv-foreground-muted">
          No partners match these filters.
        </p>
      ) : null}

      <p className="text-sm text-uv-foreground-muted">
        Admins manage verification in{' '}
        <Link
          href="/admin/partners/approvals"
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'h-auto px-0',
          )}
        >
          Approval Queue
        </Link>
        .
      </p>
    </div>
  );
}
