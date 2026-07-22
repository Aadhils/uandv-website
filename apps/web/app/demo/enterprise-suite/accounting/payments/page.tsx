'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPayments, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoPayments;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Payments" description="Incoming payment attempts." />
      <DemoCard title="Payments" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Payment','Invoice','Customer','Amount','Status']} rows={data.map((c) => [c.id,c.invoiceId,c.customer,formatInr(c.amount),<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
