'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Input } from '@uandv/ui';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoCustomers, formatInr } from '@/lib/demo/erp/mock-data';

export default function ErpCustomersPage() {
  const [query, setQuery] = useState('');
  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demoCustomers;
    return demoCustomers.filter((c) =>
      [c.name, c.company, c.city, c.id].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="space-y-8">
      <DemoPageHeader title="Customer List" description="Searchable customer directory with lifetime value and ownership." />
      <DemoCard
        title="Customers"
        description={`${demoCustomers.length} accounts in mock CRM`}
        action={<Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers…" className="w-full sm:w-64" />}
      >
        <DemoTable
          headers={['Customer', 'Company', 'City', 'Owner', 'LTV', 'Status', '']}
          rows={rows.map((c) => [
            c.name,
            c.company,
            c.city,
            c.owner,
            formatInr(c.lifetimeValue),
            <StatusBadge key={c.id + '-s'} status={c.status} />,
            <Link key={c.id + '-l'} href={`/demo/erp/customers/${c.id}`} className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline">
              Details
            </Link>,
          ])}
        />
      </DemoCard>
    </div>
  );
}
