import type { Metadata } from 'next';

import { VendorDashboardPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Vendor Dashboard' };

export default function VendorHomeRoute() {
  return <VendorDashboardPage />;
}
