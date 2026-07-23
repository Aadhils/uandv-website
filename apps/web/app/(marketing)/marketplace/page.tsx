import type { Metadata } from 'next';

import { MarketplaceListingPage } from '@/components/partners';

export const metadata: Metadata = {
  title: 'Service Marketplace',
  description:
    'Browse U&V packaged services with demo pricing and suggested partners.',
};

export default function MarketplaceRoute() {
  return <MarketplaceListingPage />;
}
