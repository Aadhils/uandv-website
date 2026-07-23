import type { Metadata } from 'next';

import { AdminAssignmentPage } from '@/components/admin/assignment-page';

export const metadata: Metadata = { title: 'Smart Assignment' };

export default function AdminAssignmentRoute() {
  return <AdminAssignmentPage />;
}
