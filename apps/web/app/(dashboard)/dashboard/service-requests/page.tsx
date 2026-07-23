import type { Metadata } from 'next';

import { CustomerServiceRequestsPage } from '@/components/customer/service-requests-list-page';

export const metadata: Metadata = {
  title: 'Service Requests',
};

export default function CustomerServiceRequestsRoute() {
  return <CustomerServiceRequestsPage />;
}
