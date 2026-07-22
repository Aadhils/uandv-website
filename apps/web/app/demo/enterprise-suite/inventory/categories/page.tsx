'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoCategories } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoCategories;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Categories" description="Inventory taxonomy." />
      <DemoCard title="Categories" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['Category','Products','Description']} rows={data.map((c) => [c.name,String(c.products),c.description])} />
      </DemoCard>
    </div>
  );
}
