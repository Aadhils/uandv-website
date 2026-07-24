import type { Metadata } from 'next';

import { AdminProjectUpdatesPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Updates' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectUpdatesPage projectId={projectId} />;
}
