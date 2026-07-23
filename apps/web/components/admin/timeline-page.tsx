import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  BusinessTimeline,
  DeliveryProgress,
  HappinessScoreCard,
  LifecycleActivityFeed,
  ProjectHealthPanel,
} from '@/components/lifecycle';
import {
  buildLifetimeTimeline,
  filterTimelineForRole,
  getActivityFeedForRole,
  getAllProjectHealth,
  getCustomerHappiness,
  getServiceDeliveryProgress,
} from '@/lib/lifecycle';
import { DEMO_CUSTOMER_ID, demoProjects } from '@/lib/projects';

export function AdminTimelinePage() {
  const events = filterTimelineForRole(buildLifetimeTimeline(), 'admin');
  const health = getAllProjectHealth();
  const activity = getActivityFeedForRole('admin', { limit: 8 });
  const happiness = getCustomerHappiness(DEMO_CUSTOMER_ID);
  const delivery = demoProjects
    .map((p) => getServiceDeliveryProgress(p.id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Business Timeline & Lifecycle"
        description="Lifetime timeline, project health, delivery progress, activity, and happiness — shared engine with full admin visibility. Demo only."
      />

      <Badge variant="warning" className="w-fit">
        Sprint 3.2 · Shared lifecycle engine
      </Badge>

      <section aria-labelledby="admin-health-heading" className="space-y-3">
        <h2
          id="admin-health-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Project Health Engine
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {health.map((snapshot) => (
            <ProjectHealthPanel key={snapshot.projectId} snapshot={snapshot} />
          ))}
        </div>
      </section>

      <HappinessScoreCard score={happiness} />

      <section aria-labelledby="admin-delivery-heading" className="space-y-3">
        <h2
          id="admin-delivery-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
        >
          Service Delivery Progress
        </h2>
        <div className="space-y-4">
          {delivery.map((item) => (
            <DeliveryProgress key={item.projectId} progress={item} />
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="admin-timeline-heading" className="space-y-3">
          <h2
            id="admin-timeline-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Lifetime Business Timeline
          </h2>
          <BusinessTimeline events={events} showVisibility />
        </section>
        <section aria-labelledby="admin-activity-heading" className="space-y-3">
          <h2
            id="admin-activity-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Activity Feed
          </h2>
          <LifecycleActivityFeed items={activity} />
        </section>
      </div>
    </div>
  );
}
