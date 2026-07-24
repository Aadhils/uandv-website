import type { Metadata } from 'next';

import { AdminMarketplacePage } from '@/components/admin/marketplace-page';

export const metadata: Metadata = { title: 'Service Marketplace' };

export default function AdminMarketplaceRoute() {
  return <AdminMarketplacePage />;
}
