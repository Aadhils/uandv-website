import type { Metadata } from 'next';

import { AdminOverdueFollowUpsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Overdue Follow-ups' };

export default function AdminOverdueFollowUpsRoute() {
  return <AdminOverdueFollowUpsPage />;
}
