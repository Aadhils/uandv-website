import type { Metadata } from 'next';

import { LeadScoresPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Lead Score' };

export default function AdminLeadScoresRoute() {
  return <LeadScoresPage />;
}
