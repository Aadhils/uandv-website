import Link from 'next/link';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  formatFinanceInr,
  getBusinessOpsSnapshot,
} from '@/lib/finance';

export function AdminBusinessPage() {
  const snap = getBusinessOpsSnapshot();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Business Dashboard"
        description="Operations rollup across quotations, agreements, payments, expenses, and settlements. Admin-only · demo data."
      />

      <Badge variant="warning" className="w-fit">
        Sprint 3.3 · Financial operations
      </Badge>

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Business ops metrics"
      >
        <StatsCard
          label="Active quotations"
          value={String(snap.activeQuotations)}
          icon="FileText"
        />
        <StatsCard
          label="Pending agreements"
          value={String(snap.pendingAgreements)}
          icon="Layers"
        />
        <StatsCard
          label="Open invoices"
          value={String(snap.openInvoices)}
          icon="Wallet"
        />
        <StatsCard
          label="Overdue payments"
          value={String(snap.overduePayments)}
          icon="CircleAlert"
        />
        <StatsCard
          label="Pending expenses"
          value={String(snap.pendingExpenses)}
          icon="Clock"
        />
        <StatsCard
          label="Pending settlements"
          value={String(snap.pendingSettlements)}
          icon="Package"
        />
        <StatsCard
          label="Revenue MTD"
          value={formatFinanceInr(snap.revenueMtdInr)}
          icon="TrendingUp"
        />
        <StatsCard
          label="Profit MTD"
          value={formatFinanceInr(snap.profitMtdInr)}
          icon="Sparkles"
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="top-customers-heading" className="space-y-3">
          <h2
            id="top-customers-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Top customers (demo)
          </h2>
          <ul className="space-y-2">
            {snap.topCustomers.map((customer) => (
              <li
                key={customer.customerId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
              >
                <span className="font-medium">{customer.name}</span>
                <span className="text-sm tabular-nums text-uv-foreground-muted">
                  {formatFinanceInr(customer.revenueInr)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ops-alerts-heading" className="space-y-3">
          <h2
            id="ops-alerts-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Alerts
          </h2>
          <ul className="list-inside list-disc space-y-2 text-sm text-uv-foreground-muted">
            {snap.alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="flex flex-wrap gap-2" aria-label="Finance shortcuts">
        <Link
          href="/admin/quotations"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Quotations
        </Link>
        <Link
          href="/admin/agreements"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Agreements
        </Link>
        <Link
          href="/admin/payments"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Payment Tracker
        </Link>
        <Link
          href="/admin/expenses"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Expenses
        </Link>
        <Link
          href="/admin/settlements"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Settlements
        </Link>
        <Link
          href="/admin/profit"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Profit
        </Link>
      </section>
    </div>
  );
}
