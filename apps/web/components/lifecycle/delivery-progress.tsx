import { Badge } from '@uandv/ui';

import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatLifecycleDate,
  type ServiceDeliveryProgress,
} from '@/lib/lifecycle';

export type DeliveryProgressProps = {
  progress: ServiceDeliveryProgress;
};

export function DeliveryProgress({ progress }: DeliveryProgressProps) {
  return (
    <section
      aria-label={`Delivery progress ${progress.projectTitle}`}
      className="space-y-4 rounded-uv-xl border border-uv-border p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-medium text-uv-foreground">
            {progress.projectTitle}
          </h3>
          <p className="text-sm text-uv-foreground-muted">
            Current stage: {progress.currentStageLabel}
          </p>
        </div>
        {progress.nextMilestoneTitle ? (
          <Badge variant="outline">
            Next: {progress.nextMilestoneTitle}
            {progress.nextMilestoneDue
              ? ` · ${formatLifecycleDate(progress.nextMilestoneDue)}`
              : ''}
          </Badge>
        ) : null}
      </div>

      <ProgressBar
        value={progress.completionPercent}
        label="Overall completion"
        size="md"
      />

      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {progress.stages.map((stage) => (
          <li
            key={`${progress.projectId}-${stage.stage}`}
            className="flex items-center justify-between gap-2 rounded-uv-lg bg-uv-background-subtle px-3 py-2 text-sm"
          >
            <span className="text-uv-foreground">{stage.label}</span>
            <StatusBadge status={stage.status} />
          </li>
        ))}
      </ol>
    </section>
  );
}
