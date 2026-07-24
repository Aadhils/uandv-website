import type { Metadata } from 'next';

import { LeadDashboardPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Lead Dashboard' };

export default function AdminLeadsRoute() {
  return <LeadDashboardPage />;
}
