'use client';

import Link from 'next/link';

import { Badge } from '@uandv/ui';

import {
  getOperatingSnapshot,
  type BosOperatingSnapshot,
} from '@/lib/business-os';

export function UnifiedStatusPanel({
  snapshot: snapshotProp,
}: {
  snapshot?: BosOperatingSnapshot;
} = {}) {
  const snapshot = snapshotProp ?? getOperatingSnapshot();
  const { status } = snapshot;

  return (
    <section
      aria-labelledby="bos-status-heading"
      className="relative overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background-subtle"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--uv-brand) 16%, transparent), transparent 55%)',
        }}
        aria-hidden
      />
      <div className="relative space-y-5 px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge variant="default">Version 3.0 · Business OS</Badge>
            <h2
              id="bos-status-heading"
              className="mt-2 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl"
            >
              {status.statusHeadline}
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {status.businessName} · {status.customerName} ·{' '}
              {status.statusDetail}
            </p>
          </div>
          <div className="rounded-uv-xl border border-uv-border bg-uv-background px-4 py-3 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-uv-foreground-subtle">
              Journey
            </p>
            <p className="text-2xl font-semibold tabular-nums text-uv-foreground">
              {status.completionPercent}
              <span className="text-sm text-uv-foreground-muted">%</span>
            </p>
            <p className="text-xs text-uv-foreground-muted">
              {status.completedStages}/{status.totalStages} stages
            </p>
          </div>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-uv-border/60"
          role="progressbar"
          aria-valuenow={status.completionPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Journey completion"
        >
          <div
            className="h-full rounded-full bg-uv-brand transition-[width] duration-500"
            style={{ width: `${status.completionPercent}%` }}
          />
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ['Project', status.primaryProjectId],
            ['Stage', status.projectStageLabel],
            ['Employee', status.assignedEmployeeName],
            ['Vendor', status.vendorName],
            ['Payments due', String(status.pendingPayments)],
            ['Approvals', String(status.pendingApprovals)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="min-w-0 rounded-uv-lg border border-uv-border/80 bg-uv-background/80 px-3 py-2"
            >
              <dt className="text-[11px] uppercase tracking-wide text-uv-foreground-subtle">
                {label}
              </dt>
              <dd className="mt-0.5 truncate text-sm font-medium text-uv-foreground">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-foreground-subtle">
            Connected modules
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {status.modules.map((mod) => (
              <li key={mod.id}>
                <Link
                  href={mod.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-uv-border bg-uv-background px-2.5 py-1 text-xs text-uv-foreground transition-colors hover:border-uv-brand/40 hover:text-uv-brand"
                >
                  <span>{mod.label}</span>
                  {mod.relatedId ? (
                    <span className="text-uv-foreground-subtle">
                      {mod.statusLabel}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
