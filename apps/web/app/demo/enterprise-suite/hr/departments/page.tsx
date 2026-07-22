'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoDepartments } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoDepartments;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Departments" description="Organization structure for the demo roster." />
      <DemoCard title="Departments" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Department','Head','Employees']} rows={data.map((c) => [c.name,c.head,String(c.employees)])} />
      </DemoCard>
    </div>
  );
}
