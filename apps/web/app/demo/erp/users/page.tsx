'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoUsers } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Users" description="Platform users and invitation state." />
      <DemoCard title="Users" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Name', 'Email', 'Role', 'Last login', 'Status']}
          rows={demoUsers.map((c) => [c.name, c.email, c.role, c.lastLogin, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
