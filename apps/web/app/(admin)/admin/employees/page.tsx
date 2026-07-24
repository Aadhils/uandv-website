import type { Metadata } from 'next';

import { AdminEmployeesPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Employees' };

export default function AdminEmployeesRoute() {
  return <AdminEmployeesPage />;
}
