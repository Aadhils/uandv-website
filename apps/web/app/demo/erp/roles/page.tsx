'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoRoles } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Roles" description="Role definitions mapped to demo personas." />
      <DemoCard title="Roles" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Role', 'Users', 'Description']}
          rows={demoRoles.map((c) => [c.name, String(c.users), c.description])}
        />
      </DemoCard>
    </div>
  );
}
