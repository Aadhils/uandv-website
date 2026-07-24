import type { Metadata } from 'next';

import { AdminProjectRisksPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Risks' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectRisksPage projectId={projectId} />;
}
