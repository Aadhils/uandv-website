import type { Metadata } from 'next';

import { AdminFollowUpHistoryPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Follow-up History' };

export default function AdminFollowUpHistoryRoute() {
  return <AdminFollowUpHistoryPage />;
}
