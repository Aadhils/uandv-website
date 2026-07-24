import type { Metadata } from 'next';

import { AdminProjectsListPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Projects' };

export default function AdminProjectsRoute() {
  return <AdminProjectsListPage />;
}
