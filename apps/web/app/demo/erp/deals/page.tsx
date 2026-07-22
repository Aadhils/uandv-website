'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoDeals, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Deals" description="Opportunity list with stage, value, and close dates." />
      <DemoCard title="Deals" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Deal', 'Customer', 'Stage', 'Value', 'Probability', 'Close', 'Owner']}
          rows={demoDeals.map((c) => [c.name, c.customer, <StatusBadge key={c.id} status={c.stage} />, formatInr(c.value), c.probability + '%', c.closeDate, c.owner])}
        />
      </DemoCard>
    </div>
  );
}
