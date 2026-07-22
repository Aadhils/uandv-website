'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoRoles } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoRoles;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Roles" description="Role definitions." />
      <DemoCard title="Roles" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Role','Users','Description']} rows={data.map((c) => [c.name,String(c.users),c.description])} />
      </DemoCard>
    </div>
  );
}
