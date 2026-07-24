import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  LIFECYCLE_STAGE_LABELS,
  SERVICE_CATEGORY_LABELS,
  demoProjects,
  formatProjectDate,
  formatProjectInr,
} from '@/lib/projects';

export function AdminProjectsListPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Control Center"
        description="Shared service-delivery projects across Customer, Employee, and Vendor workspaces. Demo data only."
        actions={
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
          >
            New project
          </Link>
        }
      />

      <ResponsiveDataList
        rows={demoProjects}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Project',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <Link
                  href={`/admin/projects/${row.id}`}
                  className="font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                >
                  {row.title}
                </Link>
                <p className="text-xs text-uv-foreground-muted">{row.id}</p>
              </div>
            ),
          },
          {
            key: 'customer',
            header: 'Customer',
            render: (row) => row.customerBusinessName,
          },
          {
            key: 'service',
            header: 'Service',
            render: (row) => SERVICE_CATEGORY_LABELS[row.serviceCategory],
          },
          {
            key: 'stage',
            header: 'Current stage',
            render: (row) => (
              <StatusBadge
                status={row.currentStage}
                label={LIFECYCLE_STAGE_LABELS[row.currentStage]}
              />
            ),
          },
          {
            key: 'health',
            header: 'Health',
            render: (row) => <StatusBadge status={row.health} />,
          },
          {
            key: 'progress',
            header: 'Progress',
            render: (row) => (
              <div className="min-w-[8rem]">
                <ProgressBar
                  value={row.completionPercent}
                  label="Completion"
                  size="sm"
                />
              </div>
            ),
          },
          {
            key: 'value',
            header: 'Value',
            render: (row) => formatProjectInr(row.projectValueInr),
          },
          {
            key: 'target',
            header: 'Target',
            render: (row) => formatProjectDate(row.targetCompletionDate),
          },
        ]}
      />
    </div>
  );
}
