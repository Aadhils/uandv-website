'use client';

import Link from 'next/link';
import * as React from 'react';

import { Input, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoAdminCustomers,
  formatDisplayDate,
  type AdminCustomer,
} from '@/lib/admin';

export function AdminCustomersPage() {
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return demoAdminCustomers;
    return demoAdminCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(q) ||
        customer.businessName.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.city.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Customer Management"
        description="Search and open customer profiles. Demo list only — no CRM backend."
      />

      <div className="max-w-md">
        <label htmlFor="admin-customer-search" className="sr-only">
          Search customers
        </label>
        <Input
          id="admin-customer-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, business, email, city…"
          autoComplete="off"
        />
      </div>

      <ResponsiveDataList
        rows={filtered}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.businessName}
        emptyMessage="No customers match your search."
        columns={[
          {
            key: 'business',
            header: 'Business',
            hideOnMobile: true,
            render: (row: AdminCustomer) => (
              <div>
                <p className="font-medium">{row.businessName}</p>
                <p className="text-xs text-uv-foreground-muted">{row.name}</p>
              </div>
            ),
          },
          {
            key: 'contact',
            header: 'Contact',
            render: (row) => (
              <span className="text-uv-foreground-muted">{row.email}</span>
            ),
          },
          {
            key: 'city',
            header: 'City',
            render: (row) => row.city,
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'projects',
            header: 'Projects',
            render: (row) => String(row.projectsCount),
          },
          {
            key: 'joined',
            header: 'Joined',
            render: (row) => formatDisplayDate(row.joinedAt),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <Link
                href={`/admin/customers/${row.id}`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                View profile
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
