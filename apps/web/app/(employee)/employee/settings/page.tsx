import type { Metadata } from 'next';

import { EmployeeSettingsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Settings' };

export default function EmployeeSettingsRoute() {
  return <EmployeeSettingsPage />;
}
