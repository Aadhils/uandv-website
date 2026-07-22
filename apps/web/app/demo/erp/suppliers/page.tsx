'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoSuppliers } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Suppliers" description="Vendor directory with rating and open POs." />
      <DemoCard title="Suppliers" description="Interactive mock records for this module.">
        <DemoTable
          headers={['Supplier', 'Contact', 'City', 'Rating', 'Open POs']}
          rows={demoSuppliers.map((c) => [c.name, c.contact, c.city, String(c.rating), String(c.openPos)])}
        />
      </DemoCard>
    </div>
  );
}
