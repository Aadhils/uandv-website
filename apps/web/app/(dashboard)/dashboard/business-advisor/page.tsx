import type { Metadata } from 'next';

import { CustomerBusinessAdvisorPage } from '@/components/business-advisor';

export const metadata: Metadata = { title: 'Business Advisor' };

export default function BusinessAdvisorPage() {
  return <CustomerBusinessAdvisorPage />;
}
