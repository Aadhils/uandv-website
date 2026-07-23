import type { Metadata } from 'next';

import { EmployeeReportsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Daily Report' };

export default function EmployeeReportsRoute() {
  return <EmployeeReportsPage />;
}
