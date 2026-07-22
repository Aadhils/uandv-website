'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoEmails } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Email Timeline" description="Inbound and outbound customer communication trail." />
      <DemoCard title="Email Timeline" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Subject', 'From', 'To', 'Date', 'Direction']}
          rows={demoEmails.map((c) => [c.subject, c.from, c.to, c.date, <StatusBadge key={c.id} status={c.direction} />])}
        />
      </DemoCard>
    </div>
  );
}
