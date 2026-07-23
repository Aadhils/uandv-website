import type { Metadata } from 'next';

import { AdminProjectActivityPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Activity' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectActivityPage projectId={projectId} />;
}
