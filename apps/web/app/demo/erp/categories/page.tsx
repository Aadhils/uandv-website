'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoCategories } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Categories" description="Inventory taxonomy used across products and reports." />
      <DemoCard title="Categories" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Category', 'Products', 'Description']}
          rows={demoCategories.map((c) => [c.name, String(c.products), c.description])}
        />
      </DemoCard>
    </div>
  );
}
