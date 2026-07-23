import type { Metadata } from 'next';

import { AdminBusinessPage } from '@/components/admin/business-page';

export const metadata: Metadata = { title: 'Business Dashboard' };

export default function AdminBusinessRoute() {
  return <AdminBusinessPage />;
}
