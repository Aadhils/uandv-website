import { Badge } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatDisplayDate,
  type ProjectMilestone,
} from '@/lib/customer';

export type ProjectLifecycleTimelineProps = {
  milestones: ProjectMilestone[];
  className?: string;
};

/** Vertical milestone timeline for a single project. */
export function ProjectLifecycleTimeline({
  milestones,
  className,
}: ProjectLifecycleTimelineProps) {
  const ordered = [...milestones].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );

  if (ordered.length === 0) {
    return (
      <p className="text-sm text-uv-foreground-muted">
        No milestones yet for this project.
      </p>
    );
  }

  return (
    <ol className={`relative space-y-0 border-l border-uv-border pl-5 ${className ?? ''}`}>
      {ordered.map((milestone) => (
        <li key={milestone.id} className="relative pb-5 last:pb-0">
          <span
            className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-uv-foreground">{milestone.title}</p>
            <StatusBadge status={milestone.status} />
          </div>
          <p className="mt-1 text-sm text-uv-foreground-muted">
            {milestone.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-uv-foreground-subtle">
            <Badge variant="outline">
              Due {formatDisplayDate(milestone.dueDate)}
            </Badge>
            {milestone.completedDate ? (
              <Badge variant="secondary">
                Done {formatDisplayDate(milestone.completedDate)}
              </Badge>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
