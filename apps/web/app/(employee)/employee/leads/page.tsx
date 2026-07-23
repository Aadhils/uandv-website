import type { Metadata } from 'next';

import { EmployeeLeadsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'My Leads' };

export default function EmployeeLeadsRoute() {
  return <EmployeeLeadsPage />;
}
