import type { Metadata } from 'next';

import { EmployeeNotificationsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Notifications' };

export default function EmployeeNotificationsRoute() {
  return <EmployeeNotificationsPage />;
}
