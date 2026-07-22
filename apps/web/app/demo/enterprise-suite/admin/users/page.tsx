'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoUsers } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoUsers;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Users" description="Platform users for this Product Demo." />
      <DemoCard title="Users" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Name','Email','Role','Last login','Status']} rows={data.map((c) => [c.name,c.email,c.role,c.lastLogin,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
