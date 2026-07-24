import type { Metadata } from 'next';

import { AdminSupportPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Support' };

export default function AdminSupportRoute() {
  return <AdminSupportPage />;
}
