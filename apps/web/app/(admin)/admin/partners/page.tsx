import type { Metadata } from 'next';

import { AdminPartnersListPage } from '@/components/admin/partners';

export const metadata: Metadata = { title: 'Partner Network' };

export default function AdminPartnersRoute() {
  return <AdminPartnersListPage />;
}
