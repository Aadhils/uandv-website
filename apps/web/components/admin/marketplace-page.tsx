'use client';

import Link from 'next/link';
import * as React from 'react';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import {
  formatPartnerInr,
  getMarketplaceServices,
  getPartnerById,
} from '@/lib/partners';
import { useViewMode, viewModeLayoutClass } from '@/lib/ui/use-view-mode';

export function AdminMarketplacePage() {
  const [query, setQuery] = React.useState('');
  const [view, setView] = useViewMode('admin-marketplace', 'list');
  const services = React.useMemo(() => {
    const all = getMarketplaceServices();
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((s) =>
      [s.title, s.category, s.subCategory, s.description]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [query]);
  const allServices = getMarketplaceServices();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Service Marketplace"
        description="Service catalog with price/duration estimates, required documents, suggested partners, and business checklists. Demo only."
      />

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Catalog metrics">
        <StatsCard
          label="Services"
          value={String(allServices.length)}
          icon="Briefcase"
        />
        <StatsCard
          label="Categories"
          value={String(new Set(allServices.map((s) => s.category)).size)}
          icon="Layers"
        />
        <StatsCard
          label="Avg estimate"
          value={formatPartnerInr(
            Math.round(
              allServices.reduce((sum, s) => sum + s.estimatedPriceInr, 0) /
                allServices.length,
            ),
          )}
          icon="Wallet"
        />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md flex-1">
          <label htmlFor="marketplace-search" className="sr-only">
            Search services
          </label>
          <input
            id="marketplace-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search catalog…"
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
            autoComplete="off"
          />
        </div>
        <ViewModeToggle
          value={view}
          onChange={setView}
          label="Admin marketplace layout"
        />
      </div>

      <ul
        className={
          view === 'grid' ? viewModeLayoutClass.grid : viewModeLayoutClass.list
        }
      >
        {services.map((service) => (
          <li
            key={service.id}
            className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{service.category}</Badge>
                  <Badge variant="secondary">{service.subCategory}</Badge>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold">
                  {service.title}
                </h3>
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

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Required documents
                </dt>
                <dd className="text-uv-foreground-muted">
                  {service.requiredDocuments.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Customer eligibility
                </dt>
                <dd className="text-uv-foreground-muted">
                  {service.customerEligibility}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Suggested partners
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {service.suggestedPartnerIds.map((id) => {
                    const partner = getPartnerById(id);
                    return partner ? (
                      <Link
                        key={id}
                        href={`/admin/partners/${id}`}
                        className="text-uv-brand underline-offset-4 hover:underline"
                      >
                        {partner.companyName}
                      </Link>
                    ) : null;
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Business checklist
                </dt>
                <dd>
                  <ul className="list-inside list-disc text-uv-foreground-muted">
                    {service.businessChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/admin/assignment"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                Assign partner
              </Link>
              <PlaceholderAction>Add to quotation</PlaceholderAction>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
