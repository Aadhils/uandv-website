'use client';

import * as React from 'react';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  getTasksForProject,
  type ProjectTask,
} from '@/lib/projects';

export function AdminProjectTasksPage({ projectId }: { projectId: string }) {
  requireProject(projectId);
  const [tasks, setTasks] = React.useState<ProjectTask[]>(() =>
    getTasksForProject(projectId),
  );
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Tasks"
        description="Employee and vendor assignments with dependencies. Mark complete uses local state only."
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground-muted"
          role="status"
        >
          {message}
        </p>
      ) : null}

      <ResponsiveDataList
        rows={tasks}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        columns={[
          {
            key: 'title',
            header: 'Task',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.description}
                </p>
              </div>
            ),
          },
          {
            key: 'stage',
            header: 'Stage',
            render: (row) => LIFECYCLE_STAGE_LABELS[row.relatedStage],
          },
          {
            key: 'assignee',
            header: 'Assignee',
            render: (row) => (
              <span>
                {row.assigneeName}{' '}
                <span className="text-xs text-uv-foreground-subtle">
                  ({row.assigneeKind})
                </span>
              </span>
            ),
          },
          {
            key: 'priority',
            header: 'Priority',
            render: (row) => <StatusBadge status={row.priority} />,
          },
          {
            key: 'dates',
            header: 'Due',
            render: (row) => formatProjectDate(row.dueDate),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'progress',
            header: '%',
            render: (row) => (
              <div className="min-w-[7rem]">
                <ProgressBar
                  value={row.completionPercent}
                  label="Task progress"
                  size="sm"
                />
              </div>
            ),
          },
          {
            key: 'notes',
            header: 'Internal notes',
            render: (row) => (
              <span className="text-xs text-uv-foreground-muted">
                {row.internalNotes}
              </span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) =>
              row.status === 'completed' ? (
                <span className="text-xs text-uv-foreground-muted">Done</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  <LocalDemoButton
                    onClick={() => {
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === row.id
                            ? {
                                ...t,
                                status: 'completed',
                                completionPercent: 100,
                              }
                            : t,
                        ),
                      );
                      setMessage(`Demo: marked “${row.title}” complete.`);
                    }}
                  >
                    Mark complete
                  </LocalDemoButton>
                  <PlaceholderAction>Attach evidence</PlaceholderAction>
                </div>
              ),
          },
        ]}
      />
    </div>
  );
}

