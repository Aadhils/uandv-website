'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoEmails } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoEmails;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Communication Timeline" description="Inbound and outbound message trail." />
      <DemoCard title="Communication Timeline" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Subject','From','To','Date','Direction']} rows={data.map((c) => [c.subject,c.from,c.to,c.date,<StatusBadge key={c.id} status={c.direction} />])} />
      </DemoCard>
    </div>
  );
}
