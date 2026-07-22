'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPayroll, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoPayroll;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Payroll Overview" description="Monthly payroll draft and processed runs." />
      <DemoCard title="Payroll Overview" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Employee','Period','Gross','Net','Status']} rows={data.map((c) => [c.id,c.employee,c.period,formatInr(c.gross),formatInr(c.net),<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
