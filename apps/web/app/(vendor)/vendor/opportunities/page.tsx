import type { Metadata } from 'next';

import { VendorOpportunitiesPage } from '@/components/vendor/opportunities-page';

export const metadata: Metadata = {
  title: 'Partner Opportunities',
};

export default function VendorOpportunitiesRoute() {
  return <VendorOpportunitiesPage />;
}
