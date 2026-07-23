import type { Metadata } from 'next';

import { AdminQuotationsPage } from '@/components/admin/quotations-page';

export const metadata: Metadata = { title: 'Quotations' };

export default function AdminQuotationsRoute() {
  return <AdminQuotationsPage />;
}
