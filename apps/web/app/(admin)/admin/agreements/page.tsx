import type { Metadata } from 'next';

import { AdminAgreementsPage } from '@/components/admin/agreements-page';

export const metadata: Metadata = { title: 'Agreements' };

export default function AdminAgreementsRoute() {
  return <AdminAgreementsPage />;
}
