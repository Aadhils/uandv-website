import type { Metadata } from 'next';

import { CustomerSettingsPage } from '@/components/customer';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return <CustomerSettingsPage />;
}
