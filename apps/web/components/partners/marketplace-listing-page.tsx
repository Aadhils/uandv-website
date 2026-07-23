'use client';

import Link from 'next/link';
import * as React from 'react';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import {
  formatPartnerInr,
  getMarketplaceServices,
  getPartnerById,
  searchMarketplaceServices,
} from '@/lib/partners';

/**
 * Public Marketplace Listing — Sprint 3.1.1.
 * Reuses Release 3.6 marketplace services catalog (same as admin).
 */
export function MarketplaceListingPage() {
  const allServices = getMarketplaceServices();
  const categories = React.useMemo(
    () => [...new Set(allServices.map((s) => s.category))].sort(),
    [allServices],
  );
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<string>('all');

  const services = React.useMemo(
    () => searchMarketplaceServices(allServices, query, category),
    [allServices, query, category],
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge variant="warning">Sprint 3.1.1 · Marketplace listing</Badge>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
          Service Marketplace
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          Browse packaged services with demo price and duration estimates.
          Suggested partners link into the Partner Marketplace profiles.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/partners" className={cn(buttonVariants({ size: 'sm' }))}>
            Partner directory
          </Link>
          <Link
            href="/partners/register"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Become a partner
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Catalog metrics">
        <StatsCard
          label="Services"
          value={String(allServices.length)}
          icon="Briefcase"
        />
        <StatsCard
          label="Categories"
          value={String(categories.length)}
          icon="Layers"
        />
        <StatsCard
          label="Avg estimate"
          value={formatPartnerInr(
            Math.round(
              allServices.reduce((sum, s) => sum + s.estimatedPriceInr, 0) /
                Math.max(1, allServices.length),
            ),
          )}
          icon="Wallet"
        />
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor="public-marketplace-search" className="sr-only">
            Search services
          </label>
          <input
            id="public-marketplace-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog…"
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="public-marketplace-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="public-marketplace-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{service.category}</Badge>
                  <Badge variant="secondary">{service.subCategory}</Badge>
                </div>
                <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold">
                  {service.title}
                </h2>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  {service.description}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold tabular-nums">
                  {formatPartnerInr(service.estimatedPriceInr)}
                </p>
                <p className="text-xs text-uv-foreground-subtle">
                  ~{service.estimatedDurationDays} days
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                Suggested partners
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {service.suggestedPartnerIds.map((partnerId) => {
                  const partner = getPartnerById(partnerId);
                  return (
                    <li key={partnerId}>
                      <Link
                        href={`/partners/${partnerId}`}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                        )}
                      >
                        {partner?.companyName ?? partnerId}
                        {partner ? ` · ★ ${partner.rating.toFixed(1)}` : ''}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {services.length === 0 ? (
        <p className="text-sm text-uv-foreground-muted">
          No services match these filters.
        </p>
      ) : null}
    </div>
  );
}
