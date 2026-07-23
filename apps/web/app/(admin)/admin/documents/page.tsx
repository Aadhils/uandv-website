import type { Metadata } from 'next';

import { AdminDocumentsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Documents' };

export default function AdminDocumentsRoute() {
  return <AdminDocumentsPage />;
}
