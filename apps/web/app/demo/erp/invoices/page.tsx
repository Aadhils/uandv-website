'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoInvoices, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Invoice" description="Customer invoices across draft, sent, paid, and overdue." />
      <DemoCard title="Invoice" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Invoice', 'Customer', 'Issue', 'Due', 'Amount', 'Status']}
          rows={demoInvoices.map((c) => [c.id, c.customer, c.issueDate, c.dueDate, formatInr(c.amount), <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
