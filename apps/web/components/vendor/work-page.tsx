'use client';

import * as React from 'react';

import { Badge } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatVendorDate, getVendorAssignments, demoVendorUser } from '@/lib/vendor';
import {
  getVendorWorkOrders,
  type VendorWorkOrderView,
} from '@/lib/projects';

export function VendorWorkPage() {
  const legacyRows = getVendorAssignments();
  const [workOrders] = React.useState<VendorWorkOrderView[]>(() =>
    getVendorWorkOrders(demoVendorUser.vendorId),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="My Work"
        description="Assigned work orders from the shared project model. Limited customer/project context only when Admin permits it. No full customer records, internal financials, or other vendors."
      />

      <section aria-labelledby="shared-wo-heading" className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2
            id="shared-wo-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Project work orders
          </h2>
          <Badge variant="outline">Linked from Admin tasks</Badge>
        </div>
        <ResponsiveDataList
          rows={workOrders}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.title}
          emptyMessage="No project work orders assigned."
          columns={[
            {
              key: 'title',
              header: 'Work order',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-uv-foreground-muted">{row.id}</p>
                </div>
              ),
            },
            {
              key: 'scope',
              header: 'Assigned scope',
              render: (row) => (
                <span className="text-sm text-uv-foreground-muted">
                  {row.assignedScope}
                </span>
              ),
            },
            {
              key: 'deliverables',
              header: 'Required deliverables',
              render: (row) => (
                <ul className="list-inside list-disc text-xs text-uv-foreground-muted">
                  {row.requiredDeliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            },
            {
              key: 'deadline',
              header: 'Deadline',
              render: (row) => formatVendorDate(row.deadline),
            },
            {
              key: 'priority',
              header: 'Priority',
              render: (row) => <StatusBadge status={row.priority} />,
            },
            {
              key: 'notes',
              header: 'Admin notes',
              render: (row) => (
                <span className="text-xs text-uv-foreground-muted">
                  {row.adminNotes}
                </span>
              ),
            },
            {
              key: 'context',
              header: 'Project context',
              render: (row) =>
                row.permittedContext ? (
                  <div className="text-xs">
                    <Badge variant="outline">Permitted</Badge>
                    <p className="mt-1 text-uv-foreground-muted">
                      {row.permittedContext}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-uv-foreground-subtle">
                    Hidden — not permitted
                  </span>
                ),
            },
            {
              key: 'revision',
              header: 'Revision feedback',
              render: (row) =>
                row.revisionFeedback ? (
                  <span className="text-xs text-uv-foreground-muted">
                    {row.revisionFeedback}
                  </span>
                ) : (
                  <span className="text-xs text-uv-foreground-subtle">None</span>
                ),
            },
            {
              key: 'invoice',
              header: 'Invoice eligibility',
              render: (row) => <StatusBadge status={row.invoiceEligibility} />,
            },
            {
              key: 'progress',
              header: 'Completion',
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
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
          ]}
        />
      </section>

      <section aria-labelledby="legacy-wo-heading" className="space-y-3">
        <h2
          id="legacy-wo-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Workspace assignments
        </h2>
        <ResponsiveDataList
          rows={legacyRows}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.title}
          emptyMessage="No assignments yet."
          columns={[
            {
              key: 'title',
              header: 'Work order',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.title}</p>
                  <p className="text-xs text-uv-foreground-muted">{row.id}</p>
                </div>
              ),
            },
            {
              key: 'category',
              header: 'Category',
              render: (row) => row.category,
            },
            {
              key: 'assignedBy',
              header: 'Assigned by',
              render: (row) => row.assignedBy,
            },
            {
              key: 'priority',
              header: 'Priority',
              render: (row) => <StatusBadge status={row.priority} />,
            },
            {
              key: 'dates',
              header: 'Start / deadline',
              render: (row) => (
                <span className="text-sm">
                  {formatVendorDate(row.startDate)} →{' '}
                  {formatVendorDate(row.deadline)}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'progress',
              header: 'Completion',
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
              key: 'deliverables',
              header: 'Required deliverables',
              render: (row) => (
                <ul className="list-inside list-disc text-xs text-uv-foreground-muted">
                  {row.requiredDeliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            },
            {
              key: 'notes',
              header: 'Admin notes',
              render: (row) => (
                <span className="text-uv-foreground-muted">{row.adminNotes}</span>
              ),
            },
            {
              key: 'context',
              header: 'Project context',
              render: (row) =>
                row.customerContextPermitted && row.limitedContext ? (
                  <div className="text-xs">
                    <Badge variant="outline">Permitted</Badge>
                    <p className="mt-1 font-medium">
                      {row.limitedContext.projectCode}
                    </p>
                    <p className="text-uv-foreground-muted">
                      {row.limitedContext.projectLabel} ·{' '}
                      {row.limitedContext.industryHint}
                    </p>
                  </div>
                ) : (
                  <span className="text-xs text-uv-foreground-subtle">
                    Hidden — not permitted
                  </span>
                ),
            },
          ]}
        />
      </section>
    </div>
  );
}
