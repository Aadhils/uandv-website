'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoEmployees } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Employees" description="HR roster with department and employment status." />
      <DemoCard title="Employees" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Employee', 'Department', 'Role', 'Join date', 'Status']}
          rows={demoEmployees.map((c) => [c.name, c.department, c.role, c.joinDate, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
