import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { demoCrmConversionReport } from '@/lib/crm';

export function AdminCrmReportsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="CRM Reports"
        description="Conversion and pipeline health for admins. Employees cannot access global CRM reports."
      />

      <section
        aria-label="CRM conversion metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {demoCrmConversionReport.map((point) => (
          <StatsCard
            key={point.id}
            label={point.label}
            value={point.value}
            hint={point.hint}
            icon="TrendingUp"
          />
        ))}
      </section>
    </div>
  );
}
