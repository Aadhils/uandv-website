import type { Metadata } from 'next';

import { CustomerDocumentsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Documents' };

export default function DocumentsPage() {
  return <CustomerDocumentsPage />;
}
