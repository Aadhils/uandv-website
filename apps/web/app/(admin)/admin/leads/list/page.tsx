import type { Metadata } from 'next';

import { LeadListPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Lead List' };

export default function AdminLeadListRoute() {
  return <LeadListPage />;
}
