'use client';

import { Badge } from '@uandv/ui';

import {
  getOperatingSnapshot,
  type BosVendorRecommendation,
} from '@/lib/business-os';

export function VendorRecommendationPanel({
  vendors: vendorsProp,
}: {
  vendors?: BosVendorRecommendation[];
} = {}) {
  const list = vendorsProp ?? getOperatingSnapshot().vendors;

  return (
    <section aria-labelledby="vendor-rec-heading" className="space-y-4">
      <h2
        id="vendor-rec-heading"
        className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
      >
        Recommended vendors
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((vendor) => (
          <li
            key={vendor.partnerId}
            className="rounded-uv-xl border border-uv-border px-4 py-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-uv-foreground">
                {vendor.companyName}
              </p>
              {vendor.assignedToProject ? (
                <Badge variant="default">Assigned</Badge>
              ) : (
                <Badge variant="secondary">Suggested</Badge>
              )}
            </div>
            <p className="mt-1 text-xs text-uv-foreground-subtle">
              {vendor.categoryLabel} · {vendor.partnerId}
            </p>
            <p className="mt-2 text-sm text-uv-foreground-muted">
              {vendor.reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
