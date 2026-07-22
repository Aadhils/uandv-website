'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoTasks } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Tasks" description="Cross-module work items with priority and due dates." />
      <DemoCard title="Tasks" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Task', 'Related', 'Priority', 'Due', 'Owner', 'Status']}
          rows={demoTasks.map((c) => [c.title, c.relatedTo, <StatusBadge key={c.id+'-p'} status={c.priority} />, c.dueDate, c.owner, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
