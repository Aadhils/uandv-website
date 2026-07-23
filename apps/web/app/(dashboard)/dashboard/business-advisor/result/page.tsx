import type { Metadata } from 'next';

import { CustomerBusinessAdvisorResultPage } from '@/components/business-advisor';

export const metadata: Metadata = { title: 'Requirement Analysis Report' };

export default function BusinessAdvisorResultPage() {
  return <CustomerBusinessAdvisorResultPage />;
}
