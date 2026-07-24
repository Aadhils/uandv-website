import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatDisplayDate,
  getAdminCustomerById,
} from '@/lib/admin';

type AdminCustomerProfilePageProps = {
  customerId: string;
};

export function AdminCustomerProfilePage({
  customerId,
}: AdminCustomerProfilePageProps) {
  const customer = getAdminCustomerById(customerId);
  if (!customer) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title={customer.businessName}
        description="Customer profile and history. Demo record only."
        actions={
          <Link
            href="/admin/customers"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Back to list
          </Link>
        }
      />

      <Card padding="none">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">Profile</CardTitle>
            <StatusBadge status={customer.status} />
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Contact name</dt>
              <dd className="font-medium">{customer.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Email</dt>
              <dd className="font-medium">{customer.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Mobile</dt>
              <dd className="font-medium">{customer.mobile}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">City</dt>
              <dd className="font-medium">{customer.city}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Projects</dt>
              <dd className="font-medium">{customer.projectsCount}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Joined</dt>
              <dd className="font-medium">
                {formatDisplayDate(customer.joinedAt)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Customer History</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative space-y-0 border-l border-uv-border pl-5">
            {customer.history.map((item) => (
              <li key={item.id} className="relative pb-5 last:pb-0">
                <span
                  className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background"
                  aria-hidden
                />
                <p className="font-medium text-uv-foreground">{item.title}</p>
                <p className="text-xs text-uv-foreground-subtle">
                  {formatDisplayDate(item.date)}
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
