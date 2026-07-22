'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoFollowUps } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoFollowUps;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Follow-ups" description="Scheduled CRM follow-up actions." />
      <DemoCard title="Follow-ups" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Related','Type','Due','Owner','Status']} rows={data.map((c) => [c.id,c.relatedTo,c.type,c.dueDate,c.owner,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
