import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ProjectLifecycleTimeline } from '@/components/lifecycle/project-lifecycle-timeline';
import {
  formatDisplayDate,
  type CustomerProject,
  type ProjectMilestone,
} from '@/lib/customer';

export type ProjectLifecycleCardProps = {
  project: CustomerProject;
  milestones: ProjectMilestone[];
};

/** Modular project card with progress + milestone timeline. */
export function ProjectLifecycleCard({
  project,
  milestones,
}: ProjectLifecycleCardProps) {
  return (
    <Card padding="none">
      <CardHeader className="pb-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription>{project.summary}</CardDescription>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <ProgressBar
          value={project.progress}
          label={`Overall progress · ${project.phase ?? 'Lifecycle'}`}
        />
        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-uv-foreground-subtle">Team</dt>
            <dd className="font-medium text-uv-foreground">{project.assignedTeam}</dd>
          </div>
          <div>
            <dt className="text-xs text-uv-foreground-subtle">Start</dt>
            <dd className="font-medium text-uv-foreground">
              {formatDisplayDate(project.startDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-uv-foreground-subtle">Target</dt>
            <dd className="font-medium text-uv-foreground">
              {formatDisplayDate(project.targetCompletionDate)}
            </dd>
          </div>
        </dl>
        {project.currentMilestone ? (
          <p className="text-sm text-uv-foreground-muted">
            Current focus:{' '}
            <span className="font-medium text-uv-foreground">
              {project.currentMilestone}
            </span>
          </p>
        ) : null}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-uv-foreground">
            Project timeline
          </h3>
          <ProjectLifecycleTimeline milestones={milestones} />
        </div>
      </CardContent>
    </Card>
  );
}
