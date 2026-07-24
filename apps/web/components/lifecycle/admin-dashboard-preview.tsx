import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsCard,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import {
  formatDisplayDate,
  type AdminPreviewMetric,
  type AdminQueueItem,
} from '@/lib/customer';

export type AdminDashboardPreviewProps = {
  metrics: AdminPreviewMetric[];
  queue: AdminQueueItem[];
};

/**
 * Admin Dashboard Preview — UI foundation only.
 * Not production admin permissions or live ops data.
 */
export function AdminDashboardPreview({
  metrics,
  queue,
}: AdminDashboardPreviewProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-uv-xl border border-uv-border bg-uv-background-subtle px-5 py-6 sm:px-8">
        <Badge variant="warning">Admin preview · not production</Badge>
        <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          Operations overview
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-uv-foreground-muted sm:text-base">
          Future Admin Workspace shell preview. No authentication elevation,
          APIs, or live permissions in Sprint 3.0.4.
        </p>
      </div>

      <section
        aria-label="Admin metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => (
          <StatsCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            hint={metric.hint}
            icon="LayoutDashboard"
          />
        ))}
      </section>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Triage queue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveDataList
            rows={queue}
            getRowId={(row) => row.id}
            mobileTitle={(row) => row.title}
            columns={[
              {
                key: 'title',
                header: 'Item',
                hideOnMobile: true,
                render: (row) => (
                  <span className="font-medium">{row.title}</span>
                ),
              },
              {
                key: 'workspace',
                header: 'Workspace',
                render: (row) => (
                  <Badge variant="outline">{row.workspace}</Badge>
                ),
              },
              {
                key: 'priority',
                header: 'Priority',
                render: (row) => <StatusBadge status={row.priority} />,
              },
              {
                key: 'status',
                header: 'Status',
                render: (row) => row.statusLabel,
              },
              {
                key: 'updated',
                header: 'Updated',
                render: (row) => formatDisplayDate(row.updatedAt),
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
