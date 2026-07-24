import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  demoAdminGrowthReport,
  demoAdminProjectReport,
  demoAdminRevenueReport,
} from '@/lib/admin';

function ReportGroup({
  title,
  points,
}: {
  title: string;
  points: Array<{ id: string; label: string; value: string; hint: string }>;
}) {
  return (
    <section aria-label={title} className="space-y-4">
      <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {points.map((point) => (
          <StatsCard
            key={point.id}
            label={point.label}
            value={point.value}
            hint={point.hint}
            icon="TrendingUp"
          />
        ))}
      </div>
    </section>
  );
}

export function AdminReportsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <AdminPageHeader
        title="Reports Dashboard"
        description="Revenue, customer growth, and project status placeholders. No analytics backend."
      />
      <ReportGroup title="Revenue" points={demoAdminRevenueReport} />
      <ReportGroup title="Customer Growth" points={demoAdminGrowthReport} />
      <ReportGroup title="Project Status" points={demoAdminProjectReport} />
    </div>
  );
}
