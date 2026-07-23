import type { Metadata } from 'next';

import { VendorTimelinePage } from '@/components/vendor/timeline-page';

export const metadata: Metadata = { title: 'Work Timeline' };

export default function VendorTimelineRoute() {
  return <VendorTimelinePage />;
}
