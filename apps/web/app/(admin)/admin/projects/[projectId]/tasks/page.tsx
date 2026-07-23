import type { Metadata } from 'next';

import { AdminProjectTasksPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Tasks' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectTasksPage projectId={projectId} />;
}
