import type { Metadata } from 'next';

import { EmployeeTimelinePage } from '@/components/employee/timeline-page';

export const metadata: Metadata = { title: 'Delivery Timeline' };

export default function EmployeeTimelineRoute() {
  return <EmployeeTimelinePage />;
}
