import type { Metadata } from 'next';

import { AdminProjectTeamPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Team' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectTeamPage projectId={projectId} />;
}
