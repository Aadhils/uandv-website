import type { Metadata } from 'next';

import { LeadFollowUpsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Follow-up Center' };

export default function AdminLeadFollowUpsRoute() {
  return <LeadFollowUpsPage />;
}
