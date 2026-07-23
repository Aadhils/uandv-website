import type { Metadata } from 'next';

import { AdminDashboardPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminHomePage() {
  return <AdminDashboardPage />;
}
