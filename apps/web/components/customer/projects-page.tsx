import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  DEMO_CUSTOMER_ID,
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  getProjectsForCustomer,
} from '@/lib/projects';

/** Customer project list — shared delivery model with detail routes. */
export function CustomerProjectsPage() {
  const projects = getProjectsForCustomer(DEMO_CUSTOMER_ID);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="My Projects"
        description="Service delivery projects with customer-visible progress. Open a project for timeline, approvals, documents, and payments."
      />

      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                >
                  {project.title}
                </Link>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  {project.description}
                </p>
              </div>
              <StatusBadge status={project.health} />
            </div>
            <div className="mt-4">
              <ProgressBar
                value={project.completionPercent}
                label={LIFECYCLE_STAGE_LABELS[project.currentStage]}
                size="sm"
              />
            </div>
            <p className="mt-3 text-xs text-uv-foreground-subtle">
              Target {formatProjectDate(project.targetCompletionDate)} · Team{' '}
              {project.ownerName}
            </p>
            <div className="mt-3">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                )}
              >
                Open project
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
