'use client';

import * as React from 'react';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoEmployeeTasks,
  formatDisplayDate,
  type EmployeeTask,
} from '@/lib/employee';

export function EmployeeTasksPage() {
  const [tasks, setTasks] = React.useState<EmployeeTask[]>(demoEmployeeTasks);
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Tasks"
        description="Tasks assigned by Admin related to your leads, customers, or projects. Mark complete updates local state only."
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
                    setTasks((prev) =>
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
    </div>
  );
}
