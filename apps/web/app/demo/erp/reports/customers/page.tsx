'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoCustomers, formatInr } from '@/lib/demo/erp/mock-data';

export default function ErpCustomerReportsPage() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Customer Reports" description="Account health by lifetime value and activity." />
      <DemoCard title="Customer value ranking">
        <DemoTable
          headers={['Customer', 'Company', 'LTV', 'Open deals', 'Status']}
          rows={[...demoCustomers]
            .sort((a, b) => b.lifetimeValue - a.lifetimeValue)
            .map((c) => [
              c.name,
              c.company,
              formatInr(c.lifetimeValue),
              String(c.openDeals),
              <StatusBadge key={c.id} status={c.status} />,
            ])}
        />
      </DemoCard>
    </div>
  );
}
