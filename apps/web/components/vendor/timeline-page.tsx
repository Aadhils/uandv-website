import { Badge } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import {
  BusinessTimeline,
  LifecycleActivityFeed,
} from '@/components/lifecycle';
import {
  buildLifetimeTimeline,
  filterTimelineForRole,
  getActivityFeedForRole,
} from '@/lib/lifecycle';
import { demoVendorUser } from '@/lib/vendor';

export function VendorTimelinePage() {
  const events = filterTimelineForRole(buildLifetimeTimeline(), 'vendor', {
    vendorId: demoVendorUser.vendorId,
  });
  const activity = getActivityFeedForRole('vendor', {
    vendorId: demoVendorUser.vendorId,
    limit: 8,
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Work Timeline"
        description="Vendor-visible events for your assigned work orders only. Full customer records and internal financials stay hidden."
      />
      <Badge variant="warning" className="w-fit">
        Sprint 3.2 · Vendor visibility
      </Badge>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Timeline
          </h2>
          <BusinessTimeline events={events} />
        </section>
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Activity feed
          </h2>
          <LifecycleActivityFeed items={activity} />
        </section>
      </div>
    </div>
  );
}
