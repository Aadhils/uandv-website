import Link from 'next/link';

import {
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { demoLeadMetrics } from '@/lib/crm';

export function LeadDashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Lead Dashboard"
        description="CRM overview for leads, conversion, and pipeline health. Demo metrics only — no CRM backend."
      />

      <section
        aria-label="Lead metrics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <StatsCard
          label="Total Leads"
          value={String(demoLeadMetrics.totalLeads)}
          hint="All pipeline stages"
          icon="Users"
        />
        <StatsCard
          label="New Leads"
          value={String(demoLeadMetrics.newLeads)}
          hint="Awaiting first contact"
          icon="Sparkles"
        />
        <StatsCard
          label="Hot Leads"
          value={String(demoLeadMetrics.hotLeads)}
          hint="High intent"
          icon="CircleAlert"
        />
        <StatsCard
          label="Converted Customers"
          value={String(demoLeadMetrics.convertedCustomers)}
          hint="Won + customer"
          icon="Check"
        />
        <StatsCard
          label="Lost Leads"
          value={String(demoLeadMetrics.lostLeads)}
          hint="Closed lost"
          icon="X"
        />
        <StatsCard
          label="Conversion Rate"
          value={`${demoLeadMetrics.conversionRatePercent}%`}
          hint="Demo calculation"
          icon="TrendingUp"
        />
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/leads/list"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Lead List
        </Link>
        <Link
          href="/admin/leads/pipeline"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Pipeline
        </Link>
        <Link
          href="/admin/leads/follow-ups"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Follow-ups
        </Link>
        <Link
          href="/admin/leads/newsletter"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Newsletter
        </Link>
      </div>
    </div>
  );
}
