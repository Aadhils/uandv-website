'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoQuotations, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoQuotations;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Quotations" description="Commercial quotes with validity windows." />
      <DemoCard title="Quotations" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Quote','Customer','Amount','Valid until','Owner','Status']} rows={data.map((c) => [c.id,c.customer,formatInr(c.amount),c.validUntil,c.owner,<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
