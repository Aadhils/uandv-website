import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { displayName, ensureDbUser } from '@/lib/auth/server-user';
import { prisma } from '@/lib/db';

function statusLabel(status: string) {
  switch (status) {
    case 'NEW':
      return 'New';
    case 'CONTACTED':
      return 'Contacted';
    case 'QUALIFIED':
      return 'Qualified';
    case 'CLOSED':
      return 'Closed';
    default:
      return status;
  }
}

export async function LiveCustomerDashboardPage() {
  // Caller already confirmed server userId when possible. Never redirect to /login
  // from here — that created an authenticated redirect loop with the login page.
  const { userId } = await auth();
  if (!userId) {
    return (
      <p className="text-sm text-uv-foreground-muted" role="status">
        Unable to verify your session on the server.
      </p>
    );
  }

  const user = await ensureDbUser();
  if (!user) {
    return (
      <div className="mx-auto max-w-lg space-y-3 rounded-uv-2xl border border-uv-border bg-uv-background p-6">
        <p className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Profile sync pending
        </p>
        <p className="text-sm text-uv-foreground-muted">
          Your Clerk account is signed in, but we could not load or create your
          database profile yet. Confirm <code className="text-xs">DATABASE_URL</code>{' '}
          and try refreshing.
        </p>
      </div>
    );
  }

  if (user.accountType === 'VENDOR' || user.accountType === 'PARTNER') {
    redirect('/signup/pending');
  }

  const profile = await prisma.customerProfile.findUnique({
    where: { userId: user.id },
  });

  const enquiries = await prisma.enquiry.findMany({
    where: {
      OR: [{ userId: user.id }, { email: user.email }],
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  const name = displayName(user);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <CustomerPageHeader
          title={`Welcome, ${name.split(' ')[0]}`}
          description="Your live U&V customer workspace — profile and enquiries from real submissions."
        />
        <UserButton afterSignOutUrl="/" />
      </div>

      <section className="grid gap-4 rounded-uv-2xl border border-uv-border bg-uv-background p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            Account type
          </p>
          <p className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            {user.accountType}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            Email
          </p>
          <p className="mt-2 break-all text-sm text-uv-foreground">{user.email}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
            Mobile
          </p>
          <p className="mt-2 text-sm text-uv-foreground">
            {user.mobile || 'Not set'}
          </p>
        </div>
      </section>

      <section className="rounded-uv-2xl border border-uv-border bg-uv-background p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
            Profile summary
          </h2>
          <Link
            href="/dashboard/profile"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Edit profile
          </Link>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Full name
            </dt>
            <dd className="mt-1 text-sm text-uv-foreground">{name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Company
            </dt>
            <dd className="mt-1 text-sm text-uv-foreground">
              {profile?.companyName || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              City / State
            </dt>
            <dd className="mt-1 text-sm text-uv-foreground">
              {[profile?.city, profile?.state].filter(Boolean).join(', ') || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Business type
            </dt>
            <dd className="mt-1 text-sm text-uv-foreground">
              {profile?.businessType || '—'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-uv-2xl border border-uv-border bg-uv-background p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
            My enquiries
          </h2>
          <Link href="/contact" className={cn(buttonVariants({ size: 'sm' }))}>
            Create new enquiry
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <p className="mt-5 text-sm text-uv-foreground-muted">
            No enquiries yet. Submit a message from the contact page and it will
            appear here with a reference ID.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-uv-border border-y border-uv-border">
            {enquiries.map((enquiry) => (
              <li key={enquiry.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-uv-foreground">
                    {enquiry.reference}{' '}
                    <span className="font-normal text-uv-foreground-muted">
                      · {enquiry.serviceInterest}
                    </span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-uv-foreground-muted">
                    {enquiry.message}
                  </p>
                  <p className="mt-2 text-xs text-uv-foreground-muted">
                    {enquiry.createdAt.toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <span className="inline-flex shrink-0 rounded-uv-full border border-uv-border bg-uv-background-subtle px-3 py-1 text-xs font-medium text-uv-foreground">
                  {statusLabel(enquiry.status)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-uv-2xl border border-dashed border-uv-border bg-uv-background-subtle p-5 sm:p-6">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Coming soon / demo modules
        </h2>
        <p className="mt-2 text-sm text-uv-foreground-muted">
          Projects, payments, agreements, Business OS panels, and marketplace
          tools on this workspace remain demo or placeholder. They are separate
          from your live profile and enquiries above.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/dashboard/projects"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Projects (demo)
          </Link>
          <Link
            href="/dashboard/payments"
            className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
          >
            Payments (demo)
          </Link>
        </div>
      </section>
    </div>
  );
}
