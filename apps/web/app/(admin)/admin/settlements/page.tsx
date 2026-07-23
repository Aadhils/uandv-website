import type { Metadata } from 'next';

import { AdminSettlementsPage } from '@/components/admin/settlements-page';

export const metadata: Metadata = { title: 'Vendor Settlements' };

export default function AdminSettlementsRoute() {
  return <AdminSettlementsPage />;
}
