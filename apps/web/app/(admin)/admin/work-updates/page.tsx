import type { Metadata } from 'next';

import { AdminWorkUpdatesPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Work Updates' };

export default function AdminWorkUpdatesRoute() {
  return <AdminWorkUpdatesPage />;
}
