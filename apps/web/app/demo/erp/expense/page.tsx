'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoExpense, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Expense" description="Operating and procurement expense ledger." />
      <DemoCard title="Expense" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Date', 'Category', 'Description', 'Method', 'Amount']}
          rows={demoExpense.map((c) => [c.date, c.category, c.description, c.method, formatInr(c.amount)])}
        />
      </DemoCard>
    </div>
  );
}
