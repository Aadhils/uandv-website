import type { Metadata } from 'next';

import { AdminTimelinePage } from '@/components/admin/timeline-page';

export const metadata: Metadata = { title: 'Business Timeline' };

export default function AdminTimelineRoute() {
  return <AdminTimelinePage />;
}
