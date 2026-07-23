import type { Metadata } from 'next';

import { AdminProfitPage } from '@/components/admin/profit-page';

export const metadata: Metadata = { title: 'Profit Dashboard' };

export default function AdminProfitRoute() {
  return <AdminProfitPage />;
}
