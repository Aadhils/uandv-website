import type { Metadata } from 'next';

import { VendorProfilePage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Profile' };

export default function VendorProfileRoute() {
  return <VendorProfilePage />;
}
