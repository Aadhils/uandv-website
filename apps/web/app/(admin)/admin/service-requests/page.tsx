import type { Metadata } from 'next';

import { AdminServiceRequestsPage } from '@/components/admin/service-requests-list-page';

export const metadata: Metadata = {
  title: 'Service Requests',
};

export default function AdminServiceRequestsRoute() {
  return <AdminServiceRequestsPage />;
}
