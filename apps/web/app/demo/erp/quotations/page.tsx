'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoQuotations, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Quotations" description="Commercial quotes with validity and acceptance status." />
      <DemoCard title="Quotations" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Quote', 'Customer', 'Amount', 'Valid until', 'Owner', 'Status']}
          rows={demoQuotations.map((c) => [c.id, c.customer, formatInr(c.amount), c.validUntil, c.owner, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
