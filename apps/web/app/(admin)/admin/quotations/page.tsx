import type { Metadata } from 'next';

import { AdminQuotationsListPage } from '@/components/admin/quotations/quotation-list-page';
import { requireAdminUser } from '@/lib/auth/require-admin';
import {
  getAdminQuotationStats,
  listAdminQuotations,
} from '@/lib/quotations/service';

export const metadata: Metadata = { title: 'Quotations' };
export const dynamic = 'force-dynamic';

export default async function AdminQuotationsRoute() {
  await requireAdminUser({ redirectPath: '/admin/quotations' });

  const [quotations, stats] = await Promise.all([
    listAdminQuotations({}),
    getAdminQuotationStats(),
  ]);

  return <AdminQuotationsListPage initialRows={quotations} initialStats={stats} />;
}
