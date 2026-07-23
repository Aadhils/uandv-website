import type { Metadata } from 'next';

import { EmployeeProfilePage } from '@/components/employee';

export const metadata: Metadata = { title: 'Profile' };

export default function EmployeeProfileRoute() {
  return <EmployeeProfilePage />;
}
