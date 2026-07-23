import { Badge } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import {
  AssetsSummarySection,
  BusinessHealthSection,
  CustomerJourneySection,
  DashboardQuickActionsSection,
  DashboardSummaryCards,
  PaymentSummarySection,
  ProjectProgressSection,
  RecentNotificationsSection,
  SupportSummarySection,
  UpcomingRenewalsSection,
} from '@/components/customer/dashboard';
import {
  demoAssets,
  demoBusinessHealth,
  demoBusinessPaymentSnapshot,
  demoCustomerProfile,
  demoDashboardSummary,
  demoNotifications,
  demoProjects,
  demoRenewals,
  demoTickets,
  demoTimeline,
} from '@/lib/customer';

/**
 * Customer Business Workspace dashboard — Sprint 3.0.5.
 * Demo UI only; no backend, payments, or file services.
 */
export function CustomerOverviewPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
      <CustomerPageHeader
        title={`Welcome, ${demoCustomerProfile.fullName.split(' ')[0]}`}
        description={`${demoCustomerProfile.businessName} · Customer Business Workspace. Understand progress, payments, renewals, support, and next actions in one place.`}
      />

      <section
        aria-labelledby="workspace-intro-heading"
        className="relative overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background-subtle"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--uv-brand) 16%, transparent), transparent 55%)',
          }}
          aria-hidden
        />
        <div className="relative space-y-2 px-5 py-6 sm:px-8 sm:py-7">
          <Badge variant="default">Sprint 3.0.5 · Business Workspace</Badge>
          <h2
            id="workspace-intro-heading"
            className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl"
          >
            Your business at a glance
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
            Demo data powers this overview. No live authentication elevation,
            payment gateway, or file storage in this sprint.
          </p>
        </div>
      </section>

      <BusinessHealthSection health={demoBusinessHealth} />

      <DashboardSummaryCards summary={demoDashboardSummary} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
        <ProjectProgressSection projects={demoProjects} />
        <div className="space-y-8">
          <PaymentSummarySection snapshot={demoBusinessPaymentSnapshot} />
          <RecentNotificationsSection notifications={demoNotifications} />
        </div>
      </div>

      <UpcomingRenewalsSection renewals={demoRenewals} />

      <DashboardQuickActionsSection />

      <div className="grid gap-8 lg:grid-cols-2">
        <CustomerJourneySection events={demoTimeline} />
        <SupportSummarySection tickets={demoTickets} />
      </div>

      <AssetsSummarySection assets={demoAssets} />
    </div>
  );
}
