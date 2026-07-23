import type { Metadata } from 'next';

import { CustomerProfilePage } from '@/components/customer';

export const metadata: Metadata = { title: 'Profile' };

export default function ProfilePage() {
  return <CustomerProfilePage />;
}
