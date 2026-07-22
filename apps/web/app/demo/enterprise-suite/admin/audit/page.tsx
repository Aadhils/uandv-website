'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoAudit } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoAudit;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Audit Log" description="Recent demo actions across modules." />
      <DemoCard title="Audit Log" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Actor','Action','When']} rows={data.map((c) => [c.actor,c.action,c.at])} />
      </DemoCard>
    </div>
  );
}
