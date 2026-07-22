'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoLeads } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Leads" description="Inbound and outbound lead queue with scoring." />
      <DemoCard title="Leads" description="Interactive mock records for this module.">
        <DemoTable
          headers={['ID', 'Name', 'Company', 'Source', 'Score', 'Owner', 'Status']}
          rows={demoLeads.map((c) => [c.id, c.name, c.company, c.source, String(c.score), c.owner, <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
