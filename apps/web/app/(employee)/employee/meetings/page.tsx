import type { Metadata } from 'next';

import { EmployeeMeetingsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Meetings' };

export default function EmployeeMeetingsRoute() {
  return <EmployeeMeetingsPage />;
}
