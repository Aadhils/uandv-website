import type { Metadata } from 'next';

import { VendorPaymentsPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Payments' };

export default function VendorPaymentsRoute() {
  return <VendorPaymentsPage />;
}
