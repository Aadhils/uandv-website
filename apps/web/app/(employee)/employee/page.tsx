import type { Metadata } from 'next';

import { EmployeeDashboardPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Employee Dashboard' };

export default function EmployeeHomeRoute() {
  return <EmployeeDashboardPage />;
}
