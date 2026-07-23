import type { Metadata } from 'next';

import { AdminProjectsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Projects' };

export default function AdminProjectsRoute() {
  return <AdminProjectsPage />;
}
