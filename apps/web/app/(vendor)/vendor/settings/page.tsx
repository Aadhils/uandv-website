import type { Metadata } from 'next';

import { VendorSettingsPage } from '@/components/vendor';

export const metadata: Metadata = { title: 'Settings' };

export default function VendorSettingsRoute() {
  return <VendorSettingsPage />;
}
