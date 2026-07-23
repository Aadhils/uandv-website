import type { Metadata } from 'next';

import { CustomerAssetsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'My Assets' };

export default function AssetsPage() {
  return <CustomerAssetsPage />;
}
