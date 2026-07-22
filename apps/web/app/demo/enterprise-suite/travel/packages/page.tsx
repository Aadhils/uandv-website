'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button, buttonVariants, cn } from '@uandv/ui';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPackages, formatInr } from '@/lib/demo/enterprise-suite/mock-data';

const tabs = ['all','domestic','international','group','honeymoon','pilgrimage','corporate'] as const;

export default function Page() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('all');
  const rows = useMemo(() => (tab === 'all' ? demoPackages : demoPackages.filter((p) => p.category === tab)), [tab]);
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Tour Package Management" description="Domestic, international, group, honeymoon, pilgrimage, and corporate packages." actions={<Link href="/demo/enterprise-suite/travel/packages/new" className={cn(buttonVariants({ size: 'sm' }))}>Create package</Link>} />
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => <Button key={t} size="sm" variant={tab === t ? 'primary' : 'outline'} onClick={() => setTab(t)}>{t}</Button>)}
      </div>
      <DemoCard title="Package list" description={`${rows.length} packages in this tab`}>
        <DemoTable
          headers={['Package','Category','Days','Price','Seats','Availability','Departures']}
          rows={rows.map((c) => [c.name, c.category, String(c.days), formatInr(c.price), String(c.seats), <StatusBadge key={c.id} status={c.availability === 'limited' ? 'pending' : 'available'} />, c.departures.join(', ')])}
        />
      </DemoCard>
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.slice(0, 2).map((p) => (
          <DemoCard key={p.id} title={p.name} description={`${p.category} · ${p.days} days`}>
            <p className="text-sm"><span className="font-medium">Inclusions:</span> {p.inclusions.join(', ')}</p>
            <p className="mt-2 text-sm"><span className="font-medium">Exclusions:</span> {p.exclusions.join(', ')}</p>
            <p className="mt-2 text-sm"><span className="font-medium">Itinerary:</span> {p.itinerary.join(' → ')}</p>
            <p className="mt-3 font-semibold text-uv-brand">{formatInr(p.price)}</p>
          </DemoCard>
        ))}
      </div>
    </div>
  );
}
