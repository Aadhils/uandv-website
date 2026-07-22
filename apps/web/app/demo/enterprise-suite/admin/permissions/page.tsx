'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPermissions } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoPermissions;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Permissions" description="Module access matrix." />
      <DemoCard title="Permissions" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Module','Action','Admin','Sales','HR','Travel']} rows={data.map((c) => [c.module,c.action,c.admin?'Yes':'No',c.sales?'Yes':'No',c.hr?'Yes':'No',c.travel?'Yes':'No'])} />
      </DemoCard>
    </div>
  );
}
