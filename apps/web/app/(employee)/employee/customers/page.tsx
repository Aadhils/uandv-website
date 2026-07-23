import type { Metadata } from 'next';

import { EmployeeCustomersPage } from '@/components/employee';

export const metadata: Metadata = { title: 'My Customers' };

export default function EmployeeCustomersRoute() {
  return <EmployeeCustomersPage />;
}
