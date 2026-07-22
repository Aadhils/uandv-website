'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoPayments, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Payment" description="Incoming payment attempts linked to invoices." />
      <DemoCard title="Payment" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Payment', 'Invoice', 'Customer', 'Method', 'Date', 'Amount', 'Status']}
          rows={demoPayments.map((c) => [c.id, c.invoiceId, c.customer, c.method, c.date, formatInr(c.amount), <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
