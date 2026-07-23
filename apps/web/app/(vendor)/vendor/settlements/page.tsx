import type { Metadata } from 'next';

import { VendorSettlementsPage } from '@/components/vendor/settlements-page';

export const metadata: Metadata = { title: 'Settlements' };

export default function VendorSettlementsRoute() {
  return <VendorSettlementsPage />;
}
