'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoFollowUps } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Follow-up" description="Scheduled customer and lead follow-up actions." />
      <DemoCard title="Follow-up" description="Interactive mock records for this module.">
        <DemoTable
          headers={['ID', 'Related to', 'Type', 'Due', 'Owner', 'Status', 'Note']}
          rows={demoFollowUps.map((c) => [c.id, c.relatedTo, c.type, c.dueDate, c.owner, <StatusBadge key={c.id} status={c.status} />, c.note])}
        />
      </DemoCard>
    </div>
  );
}
