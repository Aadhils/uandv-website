import type { Metadata } from 'next';

import { AdminBusinessAdvisorListPage } from '@/components/business-advisor';

export const metadata: Metadata = { title: 'AI Requirement Analysis' };

export default function AdminBusinessAdvisorPage() {
  return <AdminBusinessAdvisorListPage />;
}
