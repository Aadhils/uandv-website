'use client';

import * as React from 'react';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  getApprovalsForProject,
  getProjectById,
  type ProjectApproval,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectApprovalsPage({
  projectId,
}: {
  projectId: string;
}) {
  if (!getProjectById(projectId)) notFound();
  const [rows, setRows] = React.useState<ProjectApproval[]>(() =>
    getApprovalsForProject(projectId).filter((a) => a.customerActionable),
  );
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Approvals"
        description="Approve or reject requests awaiting your action. Local demo state only."
      />
      {message ? (
        <p className="text-sm text-uv-foreground-muted" role="status">
          {message}
        </p>
      ) : null}
      <ResponsiveDataList
        rows={rows}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.title}
        emptyMessage="No approvals waiting on you."
        columns={[
          {
            key: 'title',
            header: 'Request',
            hideOnMobile: true,
            render: (row) => row.title,
          },
          {
            key: 'type',
            header: 'Type',
            render: (row) => <StatusBadge status={row.type} />,
          },
          {
            key: 'due',
            header: 'Due',
            render: (row) => formatProjectDate(row.dueDate),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'comments',
            header: 'Comments',
            render: (row) => row.comments,
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) =>
              row.status !== 'pending' ? (
                <span className="text-xs text-uv-foreground-muted">Done</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  <LocalDemoButton
                    onClick={() => {
                      setRows((prev) =>
                        prev.map((a) =>
                          a.id === row.id
                            ? {
                                ...a,
                                status: 'approved',
                                decidedAt: '2026-07-23',
                              }
                            : a,
                        ),
                      );
                      setMessage(`Demo: approved “${row.title}”.`);
                    }}
                  >
                    Approve
                  </LocalDemoButton>
                  <LocalDemoButton
                    variant="secondary"
                    onClick={() => {
                      setRows((prev) =>
                        prev.map((a) =>
                          a.id === row.id
                            ? {
                                ...a,
                                status: 'rejected',
                                decidedAt: '2026-07-23',
                              }
                            : a,
                        ),
                      );
                      setMessage(`Demo: rejected “${row.title}”.`);
                    }}
                  >
                    Reject
                  </LocalDemoButton>
                </div>
              ),
          },
        ]}
      />
    </div>
  );
}
