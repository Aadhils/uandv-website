import type { Metadata } from 'next';

import { AdminCrmReportsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'CRM Reports' };

export default function AdminCrmReportsRoute() {
  return <AdminCrmReportsPage />;
}
