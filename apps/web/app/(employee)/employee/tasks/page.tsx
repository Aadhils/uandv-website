import type { Metadata } from 'next';

import { EmployeeTasksPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Tasks' };

export default function EmployeeTasksRoute() {
  return <EmployeeTasksPage />;
}
