import type { Metadata } from 'next';

import { AdminProjectApprovalsPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Approvals' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectApprovalsPage projectId={projectId} />;
}
