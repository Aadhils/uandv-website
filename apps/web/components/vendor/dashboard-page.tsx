import Link from 'next/link';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  VENDOR_DEMO_TODAY,
  demoVendorMessages,
  demoVendorNotifications,
  demoVendorUser,
  formatVendorDate,
  formatVendorDateTime,
  getVendorAssignments,
  getVendorDashboardSummary,
} from '@/lib/vendor';
import { getTasksForVendor, getVendorWorkOrders } from '@/lib/projects';

export function VendorDashboardPage() {
  const summary = getVendorDashboardSummary();
  const workOrders = getVendorWorkOrders(demoVendorUser.vendorId);
  const deadlines = [
    ...workOrders.map((w) => ({
      id: w.id,
      title: w.title,
      deadline: w.deadline,
      priority: w.priority,
      status: w.status,
    })),
    ...getVendorAssignments()
      .filter((a) => a.status !== 'completed')
      .map((a) => ({
        id: a.id,
        title: a.title,
        deadline: a.deadline,
        priority: a.priority,
        status: a.status,
      })),
  ]
    .filter((a) => a.status !== 'completed')
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4);
  const recentMessages = demoVendorMessages.slice(0, 3);
  const recentNotes = demoVendorNotifications.filter((n) => !n.read).slice(0, 3);
  const revisions = workOrders.filter((w) => w.revisionFeedback).length;
  const invoiceEligible = workOrders.filter(
    (w) => w.invoiceEligibility === 'eligible',
  ).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title={`Welcome, ${demoVendorUser.name}`}
        description={`Assigned work overview for ${formatVendorDate(VENDOR_DEMO_TODAY)}. You only see your vendor records. Customer data stays hidden unless Admin permits limited project context.`}
      />

      <section
        aria-label="Vendor summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Assigned work orders"
          value={String(workOrders.length)}
          hint="From shared projects"
          icon="Briefcase"
        />
        <StatsCard
          label="Deliverables due"
          value={String(
            workOrders.filter((w) => w.status !== 'completed').length,
          )}
          icon="Package"
        />
        <StatsCard
          label="Revisions requested"
          value={String(revisions)}
          icon="CircleAlert"
        />
        <StatsCard
          label="Invoice eligibility"
          value={String(invoiceEligible)}
          hint="Completed WOs"
          icon="FileText"
        />
        <StatsCard
          label="Active assignments"
          value={String(summary.activeAssignments)}
          icon="Briefcase"
        />
        <StatsCard
          label="Pending deliverables"
          value={String(summary.pendingDeliverables)}
          icon="Package"
        />
        <StatsCard
          label="Awaiting review"
          value={String(summary.awaitingReview)}
          icon="Clock"
        />
        <StatsCard
          label="Approved deliverables"
          value={String(summary.approvedDeliverables)}
          icon="Check"
        />
        <StatsCard
          label="Invoice-eligible WOs"
          value={String(
            getTasksForVendor(demoVendorUser.vendorId).filter(
              (t) => t.status === 'completed' || t.status === 'awaiting_review',
            ).length,
          )}
          hint="Linked from shared projects"
          icon="FileText"
        />
        <StatsCard
          label="Pending invoices"
          value={String(summary.pendingInvoices)}
          icon="FileText"
        />
        <StatsCard
          label="Pending payments"
          value={String(summary.pendingPayments)}
          icon="Wallet"
        />
        <StatsCard
          label="Upcoming deadlines"
          value={String(summary.upcomingDeadlines)}
          icon="Calendar"
        />
        <StatsCard
          label="Notifications"
          value={String(summary.unreadNotifications)}
          hint="Unread"
          icon="Bell"
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-label="Upcoming deadlines" className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Upcoming deadlines
          </h2>
          <ul className="space-y-2">
            {deadlines.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    Due {formatVendorDate(item.deadline)}
                  </p>
                </div>
                <StatusBadge status={item.priority} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Recent messages" className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Recent messages
          </h2>
          <ul className="space-y-2">
            {recentMessages.map((msg) => (
              <li
                key={msg.id}
                className="rounded-uv-lg border border-uv-border px-3 py-2.5"
              >
                <p className="font-medium">{msg.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {msg.author} · {formatVendorDateTime(msg.occurredAt)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-label="Notifications preview" className="space-y-3">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Notifications
        </h2>
        {recentNotes.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No unread notifications.</p>
        ) : (
          <ul className="space-y-2">
            {recentNotes.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
              >
                <Badge variant="info">Unread</Badge>
                <span className="font-medium">{item.title}</span>
                <span className="text-sm text-uv-foreground-muted">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Quick actions" className="flex flex-wrap gap-2">
        <Link
          href="/vendor/work"
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          My work
        </Link>
        <Link
          href="/vendor/deliverables"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Deliverables
        </Link>
        <Link
          href="/vendor/invoices"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Invoices
        </Link>
        <Link
          href="/vendor/payments"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Payments
        </Link>
        <Link
          href="/vendor/messages"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Messages
        </Link>
      </section>
    </div>
  );
}
