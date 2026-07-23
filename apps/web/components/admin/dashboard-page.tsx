import Link from 'next/link';

import {
  ActivityFeed,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  demoAdminActivities,
  demoAdminMetrics,
  formatDisplayDate,
  formatInr,
} from '@/lib/admin';

export function AdminDashboardPage() {
  const activityItems = demoAdminActivities.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.detail,
    time: formatDisplayDate(item.occurredAt),
    icon: 'Sparkles' as const,
  }));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Admin Dashboard"
        description="Operations overview for customers, projects, revenue, payments, and support. Placeholder UI only."
      />

      <section
        aria-label="Admin metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <StatsCard
          label="Total Customers"
          value={String(demoAdminMetrics.totalCustomers)}
          hint="Active + onboarding"
          icon="Users"
        />
        <StatsCard
          label="Active Projects"
          value={String(demoAdminMetrics.activeProjects)}
          hint="In delivery"
          icon="Briefcase"
        />
        <StatsCard
          label="Revenue Summary"
          value={formatInr(demoAdminMetrics.revenueInr)}
          hint="YTD demo aggregate"
          icon="TrendingUp"
        />
        <StatsCard
          label="Pending Payments"
          value={formatInr(demoAdminMetrics.pendingPaymentsInr)}
          hint="No gateway connected"
          icon="Wallet"
        />
        <StatsCard
          label="Open Tickets"
          value={String(demoAdminMetrics.openTickets)}
          hint="Support queue"
          icon="MessageCircle"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card padding="none">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ActivityFeed items={activityItems} />
          </CardContent>
        </Card>

        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">Quick links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link
              href="/admin/customers"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Customers
            </Link>
            <Link
              href="/admin/projects"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Projects
            </Link>
            <Link
              href="/admin/payments"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Payments
            </Link>
            <Link
              href="/admin/support"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Support
            </Link>
            <Link
              href="/admin/reports"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Reports
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
