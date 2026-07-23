import { QuickActionCard } from '@uandv/ui';

import { siteConfig } from '@/lib/site';

export function DashboardQuickActionsSection() {
  return (
    <section aria-labelledby="quick-actions-heading" className="space-y-4">
      <h2
        id="quick-actions-heading"
        className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
      >
        Quick Actions
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <QuickActionCard
          title="Request a new service"
          description="Smart Matching marketplace request"
          icon="Plus"
          href="/dashboard/service-requests"
        />
        <QuickActionCard
          title="View project"
          description="See progress and milestones"
          icon="Briefcase"
          href="/dashboard/projects"
        />
        <QuickActionCard
          title="Make payment"
          description="Placeholder · no gateway"
          icon="CreditCard"
          badge="Soon"
          disabled
        />
        <QuickActionCard
          title="Upload document"
          description="Placeholder · no file storage"
          icon="FileText"
          badge="Soon"
          disabled
        />
        <QuickActionCard
          title="Raise support ticket"
          description="Open Support Center"
          icon="MessageCircle"
          href="/dashboard/support"
        />
        <QuickActionCard
          title="Contact U&V"
          description="Chat on WhatsApp"
          icon="Phone"
          href={siteConfig.whatsapp}
        />
      </div>
    </section>
  );
}
