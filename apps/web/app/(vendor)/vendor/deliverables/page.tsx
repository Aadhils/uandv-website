import type { Metadata } from 'next';

import { VendorDeliverablesPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Deliverables' };

export default function VendorDeliverablesRoute() {
  return <VendorDeliverablesPage />;
}
