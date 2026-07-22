'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoPermissions } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Permissions" description="Module access matrix for Admin, Sales, and HR." />
      <DemoCard title="Permissions" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Module', 'Action', 'Admin', 'Sales', 'HR']}
          rows={demoPermissions.map((c) => [c.module, c.action, c.admin ? 'Yes' : 'No', c.sales ? 'Yes' : 'No', c.hr ? 'Yes' : 'No'])}
        />
      </DemoCard>
    </div>
  );
}
