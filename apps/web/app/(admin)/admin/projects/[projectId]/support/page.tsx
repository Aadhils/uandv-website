import type { Metadata } from 'next';

import { AdminProjectSupportPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Support' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectSupportPage projectId={projectId} />;
}
