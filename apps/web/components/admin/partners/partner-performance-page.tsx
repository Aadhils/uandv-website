import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import { getPartnerPerformance } from '@/lib/partners';

export function AdminPartnerPerformancePage({
  partnerId,
}: {
  partnerId: string;
}) {
  requirePartner(partnerId);
  const perf = getPartnerPerformance(partnerId);

  if (!perf) {
    return (
      <div className="mx-auto max-w-6xl">
        <AdminPageHeader
          title="Partner Performance"
          description="No performance snapshot for this partner."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Partner Performance"
        description="Completed vs delayed work, ratings, satisfaction, SLA proxies. Demo metrics only."
      />
      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Performance metrics"
      >
        <StatsCard
          label="Completed projects"
          value={String(perf.completedProjects)}
          icon="Check"
        />
        <StatsCard
          label="Delayed projects"
          value={String(perf.delayedProjects)}
          icon="CircleAlert"
        />
        <StatsCard
          label="Average rating"
          value={perf.averageRating.toFixed(1)}
          icon="Sparkles"
        />
        <StatsCard
          label="Customer satisfaction"
          value={`${perf.customerSatisfaction}%`}
          icon="Users"
        />
        <StatsCard
          label="On-time delivery"
          value={`${perf.onTimeDeliveryPercent}%`}
          icon="TrendingUp"
        />
        <StatsCard
          label="Revision count"
          value={String(perf.revisionCount)}
          icon="Layers"
        />
        <StatsCard
          label="Response time"
          value={`${perf.responseTimeHours}h`}
          icon="Clock"
        />
      </section>
    </div>
  );
}
