import type { Metadata } from 'next';

import { CustomerRequestsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Service Requests' };

export default function RequestsPage() {
  return <CustomerRequestsPage />;
}
