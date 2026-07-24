import { Badge } from '@uandv/ui';

import { ProgressBar } from '@/components/lifecycle/progress-bar';
import type { BusinessHealthScore } from '@/lib/customer';

type BusinessHealthSectionProps = {
  health: BusinessHealthScore;
};

const dimensions: Array<{
  key: keyof Pick<
    BusinessHealthScore,
    'project' | 'payment' | 'documentation' | 'support' | 'renewal'
  >;
  label: string;
}> = [
  { key: 'project', label: 'Project health' },
  { key: 'payment', label: 'Payment health' },
  { key: 'documentation', label: 'Documentation health' },
  { key: 'support', label: 'Support health' },
  { key: 'renewal', label: 'Renewal health' },
];

export function BusinessHealthSection({ health }: BusinessHealthSectionProps) {
  return (
    <section
      aria-labelledby="business-health-heading"
      className="rounded-uv-xl border border-uv-border bg-uv-card p-5 shadow-uv-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="business-health-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
          >
            Business Health Score
          </h2>
          <p className="mt-1 text-sm text-uv-foreground-muted">
            Snapshot of delivery, payments, docs, support, and renewals.
          </p>
        </div>
        <Badge variant="warning">Demo data</Badge>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:items-center">
        <div className="flex flex-col items-center justify-center rounded-uv-xl bg-uv-background-subtle px-4 py-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Overall
          </p>
          <p
            className="mt-1 font-[family-name:var(--font-uv-display)] text-5xl font-semibold tabular-nums text-uv-brand"
            aria-label={`Overall business health score ${health.overall} out of 100`}
          >
            {health.overall}
          </p>
          <p className="mt-1 text-sm text-uv-foreground-muted">out of 100</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {dimensions.map((dimension) => (
            <ProgressBar
              key={dimension.key}
              value={health[dimension.key]}
              label={dimension.label}
              size="sm"
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-uv-foreground-subtle" role="note">
        {health.disclaimer}
      </p>
    </section>
  );
}
