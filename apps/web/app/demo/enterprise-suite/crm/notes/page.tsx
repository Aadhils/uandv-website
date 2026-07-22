'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoNotes } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoNotes;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Notes" description="Shared CRM and operations notes." />
      <DemoCard title="Notes" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Title','Related','Author','Updated','Note']} rows={data.map((c) => [c.title,c.relatedTo,c.author,c.updatedAt,c.body])} />
      </DemoCard>
    </div>
  );
}
