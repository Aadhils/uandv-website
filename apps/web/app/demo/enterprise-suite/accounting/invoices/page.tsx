'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoInvoices, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoInvoices;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Invoices" description="Customer invoices." />
      <DemoCard title="Invoices" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Invoice','Customer','Issue','Due','Amount','Status']} rows={data.map((c) => [c.id,c.customer,c.issueDate,c.dueDate,formatInr(c.amount),<StatusBadge key={c.id} status={c.status} />])} />
      </DemoCard>
    </div>
  );
}
