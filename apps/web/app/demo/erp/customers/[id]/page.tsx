'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { buttonVariants, cn } from '@uandv/ui';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/erp/ui';
import { demoDeals, demoFollowUps, formatInr, getCustomerById } from '@/lib/demo/erp/mock-data';

export default function ErpCustomerDetailsPage() {
  const params = useParams<{ id: string }>();
  const customer = getCustomerById(params.id);

  if (!customer) {
    return (
      <div className="space-y-4">
        <DemoPageHeader title="Customer not found" description="This customer id is not in the mock dataset." />
        <Link href="/demo/erp/customers" className={cn(buttonVariants({ size: 'sm' }))}>Back to list</Link>
      </div>
    );
  }

  const deals = demoDeals.filter((d) => d.customer === customer.company);
  const followUps = demoFollowUps.filter((f) => f.relatedTo.includes(customer.id) || f.relatedTo.includes(customer.company.split(' ')[0]));

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Customer Details"
        description={`${customer.company} · ${customer.id}`}
        actions={<Link href="/demo/erp/customers" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>Back to list</Link>}
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <DemoCard>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-uv-brand-muted text-lg font-bold text-uv-brand">
              {customer.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </div>
            <p className="mt-4 text-lg font-semibold text-uv-foreground">{customer.name}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{customer.company}</p>
            <div className="mt-3 flex justify-center"><StatusBadge status={customer.status} /></div>
          </div>
        </DemoCard>
        <DemoCard title="Profile">
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ['Email', customer.email],
              ['Phone', customer.phone],
              ['City', customer.city],
              ['Owner', customer.owner],
              ['Lifetime value', formatInr(customer.lifetimeValue)],
              ['Open deals', String(customer.openDeals)],
              ['Last contact', customer.lastContact],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">{label}</dt>
                <dd className="mt-1 font-medium text-uv-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </DemoCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Related deals">
          <ul className="space-y-3">
            {deals.length ? deals.map((d) => (
              <li key={d.id} className="rounded-uv-lg border border-uv-border px-3 py-3">
                <p className="font-medium text-uv-foreground">{d.name}</p>
                <p className="text-xs text-uv-foreground-muted">{d.stage} · {formatInr(d.value)}</p>
              </li>
            )) : <p className="text-sm text-uv-foreground-muted">No related deals.</p>}
          </ul>
        </DemoCard>
        <DemoCard title="Follow-ups">
          <ul className="space-y-3">
            {followUps.length ? followUps.map((f) => (
              <li key={f.id} className="rounded-uv-lg border border-uv-border px-3 py-3">
                <p className="font-medium text-uv-foreground">{f.note}</p>
                <p className="text-xs text-uv-foreground-muted">{f.dueDate} · {f.type}</p>
              </li>
            )) : <p className="text-sm text-uv-foreground-muted">No follow-ups linked.</p>}
          </ul>
        </DemoCard>
      </div>
    </div>
  );
}
