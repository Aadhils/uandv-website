import type { Metadata } from 'next';

import { EmployeeCommunicationsPage } from '@/components/employee';

export const metadata: Metadata = { title: 'Communications' };

export default function EmployeeCommunicationsRoute() {
  return <EmployeeCommunicationsPage />;
}
