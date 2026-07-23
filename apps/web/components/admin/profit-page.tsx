import { Badge, StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  formatFinanceInr,
  getProfitSnapshot,
} from '@/lib/finance';

export function AdminProfitPage() {
  const profit = getProfitSnapshot();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Profit Dashboard"
        description="Admin-only margin view from revenue, expenses, and vendor settlements. Employees cannot access this report."
      />

      <Badge variant="warning" className="w-fit">
        {profit.periodLabel} · Demo aggregate
      </Badge>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Profit metrics"
      >
        <StatsCard
          label="Revenue"
          value={formatFinanceInr(profit.revenueInr)}
          icon="TrendingUp"
        />
        <StatsCard
          label="Expenses"
          value={formatFinanceInr(profit.expensesInr)}
          icon="Wallet"
        />
        <StatsCard
          label="Vendor settlements"
          value={formatFinanceInr(profit.vendorSettlementsInr)}
          icon="Package"
        />
        <StatsCard
          label="Gross profit"
          value={formatFinanceInr(profit.grossProfitInr)}
          hint={`${profit.marginPercent}% margin`}
          icon="Sparkles"
        />
        <StatsCard
          label="Receivables"
          value={formatFinanceInr(profit.outstandingReceivablesInr)}
          icon="Clock"
        />
        <StatsCard
          label="Payables"
          value={formatFinanceInr(profit.outstandingPayablesInr)}
          icon="CircleAlert"
        />
      </section>

      <p className="text-xs text-uv-foreground-subtle" role="note">
        {profit.disclaimer}
      </p>
    </div>
  );
}
