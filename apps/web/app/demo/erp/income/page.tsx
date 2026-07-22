'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoIncome, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Income" description="Cash and bank income ledger entries." />
      <DemoCard title="Income" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Date', 'Category', 'Description', 'Method', 'Amount']}
          rows={demoIncome.map((c) => [c.date, c.category, c.description, c.method, formatInr(c.amount)])}
        />
      </DemoCard>
    </div>
  );
}
