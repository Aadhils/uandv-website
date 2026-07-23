import type { Metadata } from 'next';

import { VendorNotificationsPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Notifications' };

export default function VendorNotificationsRoute() {
  return <VendorNotificationsPage />;
}
