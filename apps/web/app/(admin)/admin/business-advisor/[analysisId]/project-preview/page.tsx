import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdminBusinessAdvisorProjectPreviewPage } from '@/components/business-advisor';
import { DEMO_ANALYSES, getDemoAnalysisById } from '@/lib/business-advisor';

export const metadata: Metadata = { title: 'Project Conversion Preview' };

type PageProps = {
  params: Promise<{ analysisId: string }>;
};

export function generateStaticParams() {
  return DEMO_ANALYSES.map((analysis) => ({ analysisId: analysis.id }));
}

export default async function AdminBusinessAdvisorProjectPreviewRoute({
  params,
}: PageProps) {
  const { analysisId } = await params;
  if (!getDemoAnalysisById(analysisId)) notFound();
  return <AdminBusinessAdvisorProjectPreviewPage analysisId={analysisId} />;
}
