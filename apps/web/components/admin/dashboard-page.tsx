import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { LifecycleActivityFeed } from '@/components/lifecycle';
import { demoAdminMetrics, formatInr } from '@/lib/admin';
import { getActivityFeedForRole } from '@/lib/lifecycle';
import { getDeliveryHealth } from '@/lib/projects';

export function AdminDashboardPage() {
  const health = getDeliveryHealth();
  const activity = getActivityFeedForRole('admin', { limit: 6 });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Admin Dashboard"
        description="Operations overview including service-delivery health across workspaces. Placeholder UI only."
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
          value={String(health.activeProjects)}
          hint="Shared delivery model"
          icon="Briefcase"
        />
        <StatsCard
          label="Delayed / at-risk"
          value={String(health.delayedProjects)}
          hint="Needs attention"
          icon="CircleAlert"
        />
        <StatsCard
          label="Pending customer approvals"
          value={String(health.pendingCustomerApprovals)}
          icon="Check"
        />
        <StatsCard
          label="Pending payments"
          value={String(health.pendingPayments)}
          hint="Project milestones"
          icon="Wallet"
        />
        <StatsCard
          label="High-risk projects"
          value={String(health.highRiskProjects)}
          icon="CircleAlert"
        />
        <StatsCard
          label="Employee delays"
          value={String(health.employeeDelays)}
          icon="Clock"
        />
        <StatsCard
          label="Vendor delays"
          value={String(health.vendorDelays)}
          icon="Package"
        />
        <StatsCard
          label="Revenue Summary"
          value={formatInr(demoAdminMetrics.revenueInr)}
          hint="YTD demo aggregate"
          icon="TrendingUp"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card padding="none">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Lifecycle activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <LifecycleActivityFeed items={activity} />
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
              href="/admin/timeline"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Timeline
            </Link>
            <Link
              href="/admin/partners"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Partners
            </Link>
            <Link
              href="/admin/marketplace"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Marketplace
            </Link>
            <Link
              href="/admin/business"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Business
            </Link>
            <Link
              href="/admin/profit"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Profit
            </Link>
            <Link
              href="/admin/notifications"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Notifications
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
