import type { Metadata } from 'next';

import { AdminProjectVendorsPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Vendors' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectVendorsPage projectId={projectId} />;
}
