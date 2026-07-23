import { Badge } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import type { ProjectHealthSnapshot } from '@/lib/lifecycle';
import { LIFECYCLE_STAGE_LABELS } from '@/lib/projects';

export type ProjectHealthPanelProps = {
  snapshot: ProjectHealthSnapshot;
  compact?: boolean;
};

export function ProjectHealthPanel({
  snapshot,
  compact = false,
}: ProjectHealthPanelProps) {
  return (
    <section
      aria-label={`Project health ${snapshot.projectTitle}`}
      className="rounded-uv-xl border border-uv-border p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-uv-foreground">{snapshot.projectTitle}</p>
          <p className="text-xs text-uv-foreground-muted">
            {LIFECYCLE_STAGE_LABELS[snapshot.currentStage]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={snapshot.status} />
          <Badge
            variant="secondary"
            aria-label={`Health score ${snapshot.score}`}
          >
            {snapshot.score}/100
          </Badge>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar
          value={snapshot.completionPercent}
          label="Service delivery progress"
          size="sm"
        />
      </div>
      {!compact ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {snapshot.factors.map((factor) => (
            <li
              key={factor.id}
              className="rounded-uv-lg bg-uv-background-subtle px-3 py-2 text-xs"
            >
              <p className="font-medium text-uv-foreground">{factor.label}</p>
              <p className="text-uv-foreground-muted">{factor.detail}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-uv-foreground-muted">
          Delayed tasks {snapshot.delayedTasks} · Open risks {snapshot.openRisks}{' '}
          · Pending approvals {snapshot.pendingApprovals}
        </p>
      )}
    </section>
  );
}
