import type { Metadata } from 'next';

import { AdminReportsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Reports' };

export default function AdminReportsRoute() {
  return <AdminReportsPage />;
}
