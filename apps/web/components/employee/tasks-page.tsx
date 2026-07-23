'use client';

import * as React from 'react';

import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoEmployeeTasks,
  demoEmployeeUser,
  formatDisplayDate,
  type EmployeeTask,
} from '@/lib/employee';
import {
  LIFECYCLE_STAGE_LABELS,
  getEmployeeProjectTaskViews,
  type EmployeeProjectTaskView,
} from '@/lib/projects';

export function EmployeeTasksPage() {
  const [crmTasks, setCrmTasks] = React.useState<EmployeeTask[]>(demoEmployeeTasks);
  const [projectTasks, setProjectTasks] = React.useState<EmployeeProjectTaskView[]>(
    () => getEmployeeProjectTaskViews(demoEmployeeUser.employeeId),
  );
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Tasks"
        description="CRM tasks plus assigned project delivery work from the shared model. No global payments or vendor settlements. Mark complete updates local state only."
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground-muted"
          role="status"
        >
          {message}
        </p>
      ) : null}

      <section aria-labelledby="project-tasks-heading" className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2
            id="project-tasks-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Assigned project tasks
          </h2>
          <Badge variant="outline">Shared delivery model</Badge>
        </div>
        <ResponsiveDataList
          rows={projectTasks}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.title}
          emptyMessage="No project tasks assigned."
          columns={[
            {
              key: 'title',
              header: 'Task',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {row.projectTitle} ·{' '}
                    {LIFECYCLE_STAGE_LABELS[row.relatedStage]}
                  </p>
                </div>
              ),
            },
            {
              key: 'priority',
              header: 'Priority',
              render: (row) => <StatusBadge status={row.priority} />,
            },
            {
              key: 'due',
              header: 'Deadline',
              render: (row) => formatDisplayDate(row.deadline),
            },
            {
              key: 'context',
              header: 'Customer context',
              render: (row) =>
                row.customerApprovedContext ? (
                  <span className="text-xs">{row.customerApprovedContext}</span>
                ) : (
                  <span className="text-xs text-uv-foreground-subtle">
                    Internal only
                  </span>
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
              key: 'followup',
              header: 'Follow-up',
              render: (row) =>
                row.requiredFollowUp ? (
                  <Badge variant="warning">{row.requiredFollowUp}</Badge>
                ) : (
                  <span className="text-xs text-uv-foreground-subtle">—</span>
                ),
            },
            {
              key: 'progress',
              header: 'Progress',
              render: (row) => (
                <div className="min-w-[7rem]">
                  <ProgressBar
                    value={row.completionPercent}
                    label="Completion"
                    size="sm"
                  />
                </div>
              ),
            },
            {
              key: 'report',
              header: 'Daily report',
              render: (row) => (
                <span className="text-xs text-uv-foreground-subtle">
                  {row.dailyReportLinkage}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) =>
                row.status === 'completed' ? (
                  <span className="text-xs text-uv-foreground-muted">Done</span>
                ) : (
                  <LocalDemoButton
                    onClick={() => {
                      setProjectTasks((prev) =>
                        prev.map((task) =>
                          task.id === row.id
                            ? {
                                ...task,
                                status: 'completed',
                                completionPercent: 100,
                                requiredFollowUp: null,
                              }
                            : task,
                        ),
                      );
                      setMessage(
                        `Demo: marked project task “${row.title}” complete.`,
                      );
                    }}
                  >
                    Mark complete
                  </LocalDemoButton>
                ),
            },
          ]}
        />
      </section>

      <section aria-labelledby="crm-tasks-heading" className="space-y-3">
        <h2
          id="crm-tasks-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          CRM / follow-up tasks
        </h2>
        <ResponsiveDataList
          rows={crmTasks}
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
                    Assigned by {row.assignedBy}
                  </p>
                </div>
              ),
            },
            {
              key: 'related',
              header: 'Related',
              render: (row) => row.relatedLabel,
            },
            {
              key: 'priority',
              header: 'Priority',
              render: (row) => <StatusBadge status={row.priority} />,
            },
            {
              key: 'due',
              header: 'Due date',
              render: (row) => formatDisplayDate(row.dueDate),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'actions',
              header: 'Actions',
              render: (row) =>
                row.status === 'completed' ? (
                  <span className="text-xs text-uv-foreground-muted">Done</span>
                ) : (
                  <LocalDemoButton
                    onClick={() => {
                      setCrmTasks((prev) =>
                        prev.map((task) =>
                          task.id === row.id
                            ? { ...task, status: 'completed' }
                            : task,
                        ),
                      );
                      setMessage(`Demo: marked “${row.title}” complete.`);
                    }}
                  >
                    Mark complete
                  </LocalDemoButton>
                ),
            },
          ]}
        />
      </section>
    </div>
  );
}
