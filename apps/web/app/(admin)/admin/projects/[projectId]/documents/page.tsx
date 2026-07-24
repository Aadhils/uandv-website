import type { Metadata } from 'next';

import { AdminProjectDocumentsPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Documents' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectDocumentsPage projectId={projectId} />;
}
