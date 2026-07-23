import type { Metadata } from 'next';

import { VendorDocumentsPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Documents' };

export default function VendorDocumentsRoute() {
  return <VendorDocumentsPage />;
}
