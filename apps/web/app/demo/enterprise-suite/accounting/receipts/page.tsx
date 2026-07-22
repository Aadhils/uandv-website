'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoReceipts, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoReceipts;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Receipts" description="Issued payment receipts." />
      <DemoCard title="Receipts" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Receipt','Date','Customer','Amount','Mode','Note']} rows={data.map((c) => [c.id,c.date,c.customer,formatInr(c.amount),c.mode,c.note])} />
      </DemoCard>
    </div>
  );
}
