import type { Metadata } from 'next';

import { LiveCustomerProfilePage } from '@/components/customer/live-profile-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Profile' };

export default function ProfilePage() {
  return <LiveCustomerProfilePage />;
}
