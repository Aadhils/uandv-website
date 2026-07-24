import type { Metadata } from 'next';

import { EmployeePipelinePage } from '@/components/employee';

export const metadata: Metadata = { title: 'Lead Pipeline' };

export default function EmployeePipelineRoute() {
  return <EmployeePipelinePage />;
}
