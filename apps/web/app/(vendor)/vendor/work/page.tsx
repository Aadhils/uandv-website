import type { Metadata } from 'next';

import { VendorWorkPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'My Work' };

export default function VendorWorkRoute() {
  return <VendorWorkPage />;
}
