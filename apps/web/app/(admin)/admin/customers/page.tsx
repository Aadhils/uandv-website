import type { Metadata } from 'next';

import { AdminCustomersPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Customers' };

export default function AdminCustomersRoute() {
  return <AdminCustomersPage />;
}
