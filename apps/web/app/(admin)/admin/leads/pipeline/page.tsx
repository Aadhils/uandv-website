import type { Metadata } from 'next';

import { LeadPipelinePage } from '@/components/admin';

export const metadata: Metadata = { title: 'Lead Pipeline' };

export default function AdminLeadPipelineRoute() {
  return <LeadPipelinePage />;
}
