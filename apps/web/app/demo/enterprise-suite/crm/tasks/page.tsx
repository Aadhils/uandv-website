'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTasks } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoTasks;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Tasks" description="Cross-module work items." />
      <DemoCard title="Tasks" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Task','Related','Priority','Due','Owner','Status']} rows={data.map((c) => [c.title,c.relatedTo,<StatusBadge key={c.id+'-p'} status={c.priority} />,c.dueDate,c.owner,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
