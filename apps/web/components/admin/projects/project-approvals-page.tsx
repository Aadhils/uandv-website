'use client';

import * as React from 'react';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatProjectDate,
  getApprovalsForProject,
  type ProjectApproval,
} from '@/lib/projects';

export function AdminProjectApprovalsPage({
  projectId,
}: {
  projectId: string;
}) {
  requireProject(projectId);
  const [rows, setRows] = React.useState<ProjectApproval[]>(() =>
    getApprovalsForProject(projectId),
  );
  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Approval Center"
        description="Requirement, design, scope, content, payment, final delivery, and change-request approvals. Local demo decisions only."
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
        columns={[
          {
            key: 'title',
            header: 'Approval',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.title}</p>
                <p className="text-xs text-uv-foreground-muted">{row.type}</p>
              </div>
            ),
          },
          {
            key: 'from',
            header: 'Requested from',
            render: (row) => row.requestedFrom,
          },
          {
            key: 'by',
            header: 'Requested by',
            render: (row) => row.requestedBy,
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
            key: 'comments',
            header: 'Comments',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.comments}</span>
            ),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) =>
              row.status !== 'pending' ? (
                <span className="text-xs text-uv-foreground-muted">
                  {row.decidedAt
                    ? `Decided ${formatProjectDate(row.decidedAt)}`
                    : '—'}
                </span>
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

