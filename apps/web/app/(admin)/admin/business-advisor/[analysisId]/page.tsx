import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdminBusinessAdvisorDetailPage } from '@/components/business-advisor';
import { DEMO_ANALYSES, getDemoAnalysisById } from '@/lib/business-advisor';

export const metadata: Metadata = { title: 'Analysis Review' };

type PageProps = {
  params: Promise<{ analysisId: string }>;
};

export function generateStaticParams() {
  return DEMO_ANALYSES.map((analysis) => ({ analysisId: analysis.id }));
}

export default async function AdminBusinessAdvisorDetailRoute({
  params,
}: PageProps) {
  const { analysisId } = await params;
  if (!getDemoAnalysisById(analysisId)) notFound();
  return <AdminBusinessAdvisorDetailPage analysisId={analysisId} />;
}
