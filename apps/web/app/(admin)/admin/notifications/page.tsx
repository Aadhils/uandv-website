import type { Metadata } from 'next';

import { AdminNotificationsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Notifications' };

export default function AdminNotificationsRoute() {
  return <AdminNotificationsPage />;
}
