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
  formatDisplayDate,
  type CustomerProject,
} from '@/lib/customer';

type ProjectProgressSectionProps = {
  projects: CustomerProject[];
};

export function ProjectProgressSection({
  projects,
}: ProjectProgressSectionProps) {
  const visible = projects.filter(
    (project) => project.status === 'active' || project.status === 'on_hold',
  );

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
        {visible.map((project) => (
          <Card key={project.id} padding="none">
            <CardHeader className="pb-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <StatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <ProgressBar
                value={project.progress}
                label="Completion"
                size="sm"
              />
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-uv-foreground-subtle">
                    Current milestone
                  </dt>
                  <dd className="font-medium text-uv-foreground">
                    {project.currentMilestone ?? '—'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-uv-foreground-subtle">
                    Assigned U&V team
                  </dt>
                  <dd className="font-medium text-uv-foreground">
                    {project.assignedTeam}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-uv-foreground-subtle">
                    Target completion
                  </dt>
                  <dd className="font-medium text-uv-foreground">
                    {formatDisplayDate(project.targetCompletionDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-uv-foreground-subtle">
                    Next action
                  </dt>
                  <dd className="font-medium text-uv-foreground">
                    {project.nextAction ?? '—'}
                  </dd>
                </div>
              </dl>
              <Link
                href="/dashboard/projects"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                View project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
