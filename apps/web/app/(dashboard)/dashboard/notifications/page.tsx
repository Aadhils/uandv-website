import type { Metadata } from 'next';

import { CustomerNotificationsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Notifications' };

export default function NotificationsPage() {
  return <CustomerNotificationsPage />;
}
