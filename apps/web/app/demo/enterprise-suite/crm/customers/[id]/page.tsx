'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { buttonVariants, cn } from '@uandv/ui';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoDeals, formatInr, getCustomerById } from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  const params = useParams<{ id: string }>();
  const customer = getCustomerById(params.id);
  if (!customer) {
    return <div className="space-y-4"><DemoPageHeader title="Customer not found" /><Link href="/demo/enterprise-suite/crm/customers" className={cn(buttonVariants({ size: 'sm' }))}>Back</Link></div>;
  }
  const deals = demoDeals.filter((d) => d.customer === customer.company);
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Customer Details" description={`${customer.company} · ${customer.id}`} actions={<Link href="/demo/enterprise-suite/crm/customers" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>Back</Link>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Profile">
          <dl className="grid gap-4 sm:grid-cols-2">
            {[['Name', customer.name],['Email', customer.email],['Phone', customer.phone],['City', customer.city],['Owner', customer.owner],['LTV', formatInr(customer.lifetimeValue)],['Status', customer.status],['Last contact', customer.lastContact]].map(([k,v]) => (
              <div key={k}><dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">{k}</dt><dd className="mt-1 font-medium">{k === 'Status' ? <StatusBadge status={String(v)} /> : v}</dd></div>
            ))}
          </dl>
        </DemoCard>
        <DemoCard title="Related deals">
          <ul className="space-y-3">
            {deals.length ? deals.map((d) => (
              <li key={d.id} className="rounded-uv-lg border border-uv-border px-3 py-3">
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-uv-foreground-muted">{d.stage} · {formatInr(d.value)}</p>
              </li>
            )) : <p className="text-sm text-uv-foreground-muted">No related deals.</p>}
          </ul>
        </DemoCard>
      </div>
    </div>
  );
}
