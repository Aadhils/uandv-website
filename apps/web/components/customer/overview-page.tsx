import {
  AssetsSummarySection,
  BusinessHealthSection,
  DashboardSummaryCards,
  PaymentSummarySection,
  ProjectProgressSection,
  RecentNotificationsSection,
  SupportSummarySection,
  UpcomingRenewalsSection,
} from '@/components/customer/dashboard';
import { CustomerPageHeader } from '@/components/customer/page-header';
import {
  CustomerJourneyTimeline,
  SmartActionCenter,
  UnifiedStatusPanel,
  VendorRecommendationPanel,
} from '@/components/business-os';
import { HappinessScoreCard } from '@/components/lifecycle';
import {
  demoAssets,
  demoBusinessHealth,
  demoBusinessPaymentSnapshot,
  demoCustomerProfile,
  demoDashboardSummary,
  demoNotifications,
  demoRenewals,
  demoTickets,
} from '@/lib/customer';
import { getCustomerHappiness } from '@/lib/lifecycle';
import { BOS_SPINE } from '@/lib/business-os';
import {
  DEMO_CUSTOMER_ID,
  getCustomerDeliverySummary,
  getCustomerVisibleUpdates,
  getMilestonesForProject,
  getProjectsForCustomer,
} from '@/lib/projects';

/**
 * Customer Business Workspace dashboard — Version 3.0 Business OS.
 * Unified status, journey timeline, and Smart Action Center over shared spine.
 * Demo UI only; no backend.
 */
export function CustomerOverviewPage() {
  const delivery = getCustomerDeliverySummary(DEMO_CUSTOMER_ID);
  const projects = getProjectsForCustomer(DEMO_CUSTOMER_ID);
  const happiness = getCustomerHappiness(DEMO_CUSTOMER_ID);
  const summary = {
    ...demoDashboardSummary,
    activeProjects: delivery.activeProjects,
    pendingApprovals: delivery.pendingApprovals,
    pendingPayments: delivery.paymentActions,
  };
  const latestUpdates = projects.flatMap((p) =>
    getCustomerVisibleUpdates(p.id).map((u) => ({
      ...u,
      projectTitle: p.title,
    })),
  );
  const upcomingMilestones = projects.flatMap((p) =>
    getMilestonesForProject(p.id)
      .filter((m) => m.customerVisible && m.status !== 'completed')
      .map((m) => ({ ...m, projectTitle: p.title })),
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
      <CustomerPageHeader
        title={`Welcome, ${demoCustomerProfile.fullName.split(' ')[0]}`}
        description={`${demoCustomerProfile.businessName} · Version 3.0 Business Operating System. Discovery, advisor, CRM, finance, vendors, and delivery share one customer spine (${BOS_SPINE.customerId} / ${BOS_SPINE.projectId}).`}
      />

      <UnifiedStatusPanel />

      <SmartActionCenter />

      <div className="grid gap-8 lg:grid-cols-2">
        <CustomerJourneyTimeline />
        <VendorRecommendationPanel />
      </div>

      <BusinessHealthSection health={demoBusinessHealth} />

      <HappinessScoreCard score={happiness} />

      <DashboardSummaryCards summary={summary} />

      <section
        aria-label="Delivery snapshot"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div className="rounded-uv-xl border border-uv-border px-4 py-3">
          <p className="text-xs text-uv-foreground-subtle">Latest updates</p>
          <p className="text-2xl font-semibold tabular-nums">
            {delivery.latestUpdates}
          </p>
        </div>
        <div className="rounded-uv-xl border border-uv-border px-4 py-3">
          <p className="text-xs text-uv-foreground-subtle">
            Upcoming milestones
          </p>
          <p className="text-2xl font-semibold tabular-nums">
            {delivery.upcomingMilestones}
          </p>
        </div>
        <div className="rounded-uv-xl border border-uv-border px-4 py-3 sm:col-span-2">
          <p className="text-xs text-uv-foreground-subtle">
            Recent work updates
          </p>
          <ul className="mt-1 space-y-1 text-sm">
            {latestUpdates.slice(0, 2).map((u) => (
              <li key={u.id} className="text-uv-foreground-muted">
                <span className="font-medium text-uv-foreground">{u.title}</span>
                {' · '}
                {u.projectTitle}
              </li>
            ))}
            {latestUpdates.length === 0 ? (
              <li className="text-uv-foreground-muted">No updates yet.</li>
            ) : null}
          </ul>
        </div>
      </section>

      {upcomingMilestones.length > 0 ? (
        <section aria-label="Upcoming milestones" className="space-y-2">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Upcoming milestones
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {upcomingMilestones.slice(0, 4).map((m) => (
              <li
                key={m.id}
                className="rounded-uv-lg border border-uv-border px-3 py-2.5 text-sm"
              >
                <p className="font-medium">{m.title}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {m.projectTitle} · due {m.dueDate}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
        <ProjectProgressSection projects={projects} />
        <div className="space-y-8">
          <PaymentSummarySection snapshot={demoBusinessPaymentSnapshot} />
          <RecentNotificationsSection notifications={demoNotifications} />
        </div>
      </div>

      <UpcomingRenewalsSection renewals={demoRenewals} />

      <div className="grid gap-8 lg:grid-cols-2">
        <SupportSummarySection tickets={demoTickets} />
        <AssetsSummarySection assets={demoAssets} />
      </div>
    </div>
  );
}
