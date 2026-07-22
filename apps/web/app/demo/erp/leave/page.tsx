'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoLeave } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Leave Management" description="Leave requests awaiting or completed for approval." />
      <DemoCard title="Leave Management" description="Interactive mock records for this module.">
        <DemoTable
          headers={['ID', 'Employee', 'Type', 'From', 'To', 'Days', 'Status']}
          rows={demoLeave.map((c) => [c.id, c.employee, c.type, c.from, c.to, String(c.days), <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
