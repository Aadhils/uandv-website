import type { Metadata } from 'next';

import { AdminEmployeePermissionsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Employee Permissions' };

export default function AdminEmployeePermissionsRoute() {
  return <AdminEmployeePermissionsPage />;
}
