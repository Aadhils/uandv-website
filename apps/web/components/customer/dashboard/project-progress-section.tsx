import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  getNextMilestone,
  type Project,
} from '@/lib/projects';

type ProjectProgressSectionProps = {
  projects: Project[];
};

export function ProjectProgressSection({
  projects,
}: ProjectProgressSectionProps) {
  const visible = projects.filter((project) => project.health !== 'completed');

  return (
    <section aria-labelledby="project-progress-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="project-progress-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
        >
          Project Progress
        </h2>
        <Link
          href="/dashboard/projects"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          View all projects
        </Link>
      </div>

      <div className="grid gap-4">
        {visible.map((project) => {
          const next = getNextMilestone(project.id);
          return (
            <Card key={project.id} padding="none">
              <CardHeader className="pb-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  <StatusBadge status={project.health} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <ProgressBar
                  value={project.completionPercent}
                  label="Completion"
                  size="sm"
                />
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs text-uv-foreground-subtle">
                      Current stage
                    </dt>
                    <dd className="font-medium text-uv-foreground">
                      {LIFECYCLE_STAGE_LABELS[project.currentStage]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-uv-foreground-subtle">
                      Next milestone
                    </dt>
                    <dd className="font-medium text-uv-foreground">
                      {next?.title ?? '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-uv-foreground-subtle">
                      Assigned U&V team
                    </dt>
                    <dd className="font-medium text-uv-foreground">
                      {project.ownerName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-uv-foreground-subtle">
                      Target completion
                    </dt>
                    <dd className="font-medium text-uv-foreground">
                      {formatProjectDate(project.targetCompletionDate)}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                  )}
                >
                  View project
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
