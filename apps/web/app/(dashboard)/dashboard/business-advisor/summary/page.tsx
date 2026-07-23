import type { Metadata } from 'next';

import { BusinessAdvisorDashboard } from '@/components/advisor-engine';

export const metadata: Metadata = {
  title: 'Business Advisor Summary',
};

export default function BusinessAdvisorSummaryPage() {
  return <BusinessAdvisorDashboard />;
}
