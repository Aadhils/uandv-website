import type { Metadata } from 'next';

import { EmployeeFollowUpsPage } from '@/components/employee';

export const metadata: Metadata = { title: "Today's Follow-ups" };

export default function EmployeeFollowUpsRoute() {
  return <EmployeeFollowUpsPage />;
}
