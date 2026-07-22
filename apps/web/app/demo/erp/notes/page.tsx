'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoNotes } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Notes" description="Shared CRM and operations notes." />
      <DemoCard title="Notes" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Title', 'Related', 'Author', 'Updated', 'Note']}
          rows={demoNotes.map((c) => [c.title, c.relatedTo, c.author, c.updatedAt, c.body])}
        />
      </DemoCard>
    </div>
  );
}
