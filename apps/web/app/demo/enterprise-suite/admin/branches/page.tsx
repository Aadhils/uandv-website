'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoBranches } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoBranches;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Branch Management" description="Demo branches and desks." />
      <DemoCard title="Branch Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Branch','City','Manager','Status']} rows={data.map((c) => [c.name,c.city,c.manager,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
