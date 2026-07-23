'use client';

import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ViewModeToggle } from '@/components/shared/view-mode-toggle';
import {
  DEMO_CUSTOMER_ID,
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  getProjectsForCustomer,
} from '@/lib/projects';
import { useViewMode, viewModeLayoutClass } from '@/lib/ui/use-view-mode';

/** Customer project list — shared delivery model with detail routes. */
export function CustomerProjectsPage() {
  const projects = getProjectsForCustomer(DEMO_CUSTOMER_ID);
  const [view, setView] = useViewMode('customer-projects', 'list');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="My Projects"
        description="Service delivery projects with customer-visible progress. Open a project for timeline, approvals, documents, and payments."
        actions={
          <ViewModeToggle
            value={view}
            onChange={setView}
            label="Projects layout"
          />
        }
      />

      <ul
        className={
          view === 'grid' ? viewModeLayoutClass.grid : viewModeLayoutClass.list
        }
      >
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
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
            <div className="mt-auto pt-3">
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
