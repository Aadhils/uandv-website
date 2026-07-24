import { Badge } from '@uandv/ui';

import { ProgressBar } from '@/components/lifecycle/progress-bar';
import type { CustomerHappinessScore } from '@/lib/lifecycle';

export type HappinessScoreCardProps = {
  score: CustomerHappinessScore;
};

export function HappinessScoreCard({ score }: HappinessScoreCardProps) {
  const trendLabel =
    score.trend === 'up'
      ? 'Improving'
      : score.trend === 'down'
        ? 'Declining'
        : 'Stable';

  return (
    <section
      aria-labelledby="happiness-score-heading"
      className="rounded-uv-xl border border-uv-border bg-uv-card p-5 shadow-uv-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="happiness-score-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
          >
            Customer Happiness Score
          </h2>
          <p className="mt-1 text-sm text-uv-foreground-muted">{score.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Demo data</Badge>
          <Badge variant="outline">{trendLabel}</Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:items-center">
        <div className="flex flex-col items-center justify-center rounded-uv-xl bg-uv-background-subtle px-4 py-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            Overall
          </p>
          <p
            className="mt-1 font-[family-name:var(--font-uv-display)] text-5xl font-semibold tabular-nums text-uv-brand"
            aria-label={`Customer happiness score ${score.overall} out of 100`}
          >
            {score.overall}
          </p>
          <p className="mt-1 text-sm text-uv-foreground-muted">out of 100</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {score.dimensions.map((dimension) => (
            <ProgressBar
              key={dimension.key}
              value={dimension.score}
              label={dimension.label}
              size="sm"
            />
          ))}
        </div>
      </div>

      <ul className="mt-4 list-inside list-disc text-sm text-uv-foreground-muted">
        {score.drivers.map((driver) => (
          <li key={driver}>{driver}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-uv-foreground-subtle" role="note">
        {score.disclaimer}
      </p>
    </section>
  );
}
