import type { Metadata } from 'next';

import { LeadCommunicationsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Communication Timeline' };

export default function AdminLeadCommunicationsRoute() {
  return <LeadCommunicationsPage />;
}
