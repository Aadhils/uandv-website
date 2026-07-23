import type { Metadata } from 'next';

import { AdminPaymentsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Payments' };

export default function AdminPaymentsRoute() {
  return <AdminPaymentsPage />;
}
