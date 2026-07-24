import type { Metadata } from 'next';

import { AdminProjectCreatePage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Create Project' };

export default function AdminProjectNewRoute() {
  return <AdminProjectCreatePage />;
}
