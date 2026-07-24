import { Badge } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
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
  getCustomerHappiness,
  getProjectHealthById,
  getServiceDeliveryProgress,
} from '@/lib/lifecycle';
import { DEMO_CUSTOMER_ID, getProjectsForCustomer } from '@/lib/projects';

export function CustomerTimelinePage() {
  const projects = getProjectsForCustomer(DEMO_CUSTOMER_ID);
  const events = filterTimelineForRole(buildLifetimeTimeline(), 'customer', {
    customerId: DEMO_CUSTOMER_ID,
  });
  const activity = getActivityFeedForRole('customer', {
    customerId: DEMO_CUSTOMER_ID,
    limit: 8,
  });
  const happiness = getCustomerHappiness(DEMO_CUSTOMER_ID);
  const health = projects
    .map((p) => getProjectHealthById(p.id))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));
  const delivery = projects
    .map((p) => getServiceDeliveryProgress(p.id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Business Timeline"
        description="Your lifetime journey with U&V — customer-visible events only. Shared lifecycle engine · demo data."
      />

      <Badge variant="warning" className="w-fit">
        Sprint 3.2 · Customer-visible timeline
      </Badge>

      <HappinessScoreCard score={happiness} />

      {health.length > 0 ? (
        <section aria-labelledby="cust-health-heading" className="space-y-3">
          <h2
            id="cust-health-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Project health
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {health.map((snapshot) => (
              <ProjectHealthPanel
                key={snapshot.projectId}
                snapshot={snapshot}
                compact
              />
            ))}
          </div>
        </section>
      ) : null}

      {delivery.length > 0 ? (
        <section aria-labelledby="cust-delivery-heading" className="space-y-3">
          <h2
            id="cust-delivery-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Service delivery progress
          </h2>
          <div className="space-y-4">
            {delivery.map((item) => (
              <DeliveryProgress key={item.projectId} progress={item} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="cust-timeline-heading" className="space-y-3">
          <h2
            id="cust-timeline-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Lifetime timeline
          </h2>
          <BusinessTimeline events={events} />
        </section>
        <section aria-labelledby="cust-activity-heading" className="space-y-3">
          <h2
            id="cust-activity-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Recent activity
          </h2>
          <LifecycleActivityFeed items={activity} />
        </section>
      </div>
    </div>
  );
}
