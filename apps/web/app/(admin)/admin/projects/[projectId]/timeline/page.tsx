import type { Metadata } from 'next';

import { AdminProjectTimelinePage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Timeline' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectTimelinePage projectId={projectId} />;
}
