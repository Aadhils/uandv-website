'use client';
import { DemoCard, DemoPageHeader, DemoStatCard } from '@/components/demo/enterprise-suite/ui';
import { demoPnL, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const income = demoPnL.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const expense = demoPnL.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Profit and Loss Overview" description="Mock P&L including travel booking and supplier lines." />
      <div className="grid gap-4 sm:grid-cols-3">
        <DemoStatCard label="Income" value={formatInr(income)} hint="Sales + travel + services" trend="July MTD demo" />
        <DemoStatCard label="Expense" value={formatInr(expense)} hint="COGS + travel + payroll" trend="July MTD demo" />
        <DemoStatCard label="Net" value={formatInr(income - expense)} hint="Income − expense" trend="Product Demo only" />
      </div>
      <DemoCard title="Line items">
        <ul className="space-y-3">
          {demoPnL.map((row) => (
            <li key={row.label} className="flex items-center justify-between rounded-uv-lg border border-uv-border px-3 py-3">
              <div><p className="font-medium">{row.label}</p><p className="text-xs capitalize text-uv-foreground-muted">{row.type}</p></div>
              <p className={`font-semibold ${row.type === 'income' ? 'text-uv-success' : 'text-uv-error'}`}>{row.type === 'income' ? '+' : '-'}{formatInr(row.amount)}</p>
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
