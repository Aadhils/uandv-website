import type { Metadata } from 'next';

import { LeadNewsletterPage } from '@/components/admin';

export const metadata: Metadata = { title: 'Newsletter Center' };

export default function AdminLeadNewsletterRoute() {
  return <LeadNewsletterPage />;
}
