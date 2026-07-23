import { StatsCard } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { demoVendorPerformance } from '@/lib/vendor';

export function VendorPerformancePage() {
  const perf = demoVendorPerformance;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Vendor Performance"
        description="Delivery quality and turnaround metrics for your assigned work. Demo values only — no payroll or incentive calculations."
      />

      <section
        aria-label="Performance metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Active assignments"
          value={String(perf.activeAssignments)}
          icon="Briefcase"
        />
        <StatsCard
          label="Completed assignments"
          value={String(perf.completedAssignments)}
          icon="Check"
        />
        <StatsCard
          label="On-time delivery"
          value={`${perf.onTimeDeliveryRatePercent}%`}
          icon="Calendar"
        />
        <StatsCard
          label="Quality score"
          value={String(perf.qualityScore)}
          hint="Out of 5"
          icon="Sparkles"
        />
        <StatsCard
          label="Revision count"
          value={String(perf.revisionCount)}
          icon="Workflow"
        />
        <StatsCard
          label="Acceptance rate"
          value={`${perf.acceptanceRatePercent}%`}
          icon="TrendingUp"
        />
        <StatsCard
          label="Avg. turnaround"
          value={`${perf.averageTurnaroundDays} days`}
          icon="Clock"
        />
        <StatsCard
          label="Admin rating"
          value={perf.adminRatingPlaceholder}
          hint="Placeholder"
          icon="Users"
        />
      </section>
    </div>
  );
}
