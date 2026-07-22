'use client';

import { DemoCard, DemoPageHeader, DemoStatCard } from '@/components/demo/erp/ui';
import { demoPnL, formatInr } from '@/lib/demo/erp/mock-data';

export default function ErpProfitLossPage() {
  const income = demoPnL.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expense = demoPnL.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const profit = income - expense;

  return (
    <div className="space-y-8">
      <DemoPageHeader title="Profit & Loss" description="Month-to-date P&L summary assembled from mock ledger totals." />
      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="Income" value={formatInr(income)} hint="Sales + services" trend="July MTD" />
        <DemoStatCard label="Expense" value={formatInr(expense)} hint="COGS + opex" trend="July MTD" />
        <DemoStatCard label="Net profit" value={formatInr(profit)} hint="Income − expense" trend={profit > 0 ? 'Positive' : 'Negative'} />
      </div>
      <DemoCard title="Line items">
        <ul className="space-y-3">
          {demoPnL.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-3 py-3">
              <div>
                <p className="font-medium text-uv-foreground">{row.label}</p>
                <p className="text-xs capitalize text-uv-foreground-muted">{row.type}</p>
              </div>
              <p className={`font-semibold ${row.type === 'income' ? 'text-uv-success' : 'text-uv-error'}`}>
                {row.type === 'income' ? '+' : '-'}
                {formatInr(row.amount)}
              </p>
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
