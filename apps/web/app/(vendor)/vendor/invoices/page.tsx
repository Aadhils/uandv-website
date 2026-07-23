import type { Metadata } from 'next';

import { VendorInvoicesPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Invoices' };

export default function VendorInvoicesRoute() {
  return <VendorInvoicesPage />;
}
