'use client';
import { useMemo, useState } from 'react';
import { Button } from '@uandv/ui';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoLeads } from '@/lib/demo/enterprise-suite/mock-data';

const statuses = ['all', 'new', 'contacted', 'qualified', 'lost'] as const;
const sources = ['all', 'Website', 'Referral', 'Expo', 'LinkedIn', 'Cold call'] as const;

export default function Page() {
  const [status, setStatus] = useState<(typeof statuses)[number]>('all');
  const [source, setSource] = useState<(typeof sources)[number]>('all');
  const rows = useMemo(
    () => demoLeads.filter((l) => (status === 'all' || l.status === status) && (source === 'all' || l.source === source)),
    [status, source],
  );
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Lead Management" description="Filter leads by status, source, and sales executive assignment." />
      <DemoCard title="Filters" description="Status and lead source tracking.">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => <Button key={s} size="sm" variant={status === s ? 'primary' : 'outline'} onClick={() => setStatus(s)}>{s}</Button>)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sources.map((s) => <Button key={s} size="sm" variant={source === s ? 'primary' : 'outline'} onClick={() => setSource(s)}>{s}</Button>)}
        </div>
      </DemoCard>
      <DemoCard title="Leads" description={`${rows.length} leads in current filter`}>
        <DemoTable
          headers={['ID','Name','Company','Source','Score','Sales executive','Status','Created']}
          rows={rows.map((c) => [c.id, c.name, c.company, c.source, String(c.score), c.owner, <StatusBadge key={c.id} status={c.status} />, c.createdAt])}
        />
      </DemoCard>
    </div>
  );
}
