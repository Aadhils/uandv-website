import type { Metadata } from 'next';

import { LeadAssignmentsPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Employee Assignment' };

export default function AdminLeadAssignmentsRoute() {
  return <LeadAssignmentsPage />;
}
