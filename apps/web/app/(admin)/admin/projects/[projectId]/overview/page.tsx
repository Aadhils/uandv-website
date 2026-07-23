import type { Metadata } from 'next';

import { AdminProjectOverviewPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Overview' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectOverviewPage projectId={projectId} />;
}
