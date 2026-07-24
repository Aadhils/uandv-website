import type { Metadata } from 'next';

import { CustomerProjectActivityPage } from '@/components/customer/projects';

export const metadata: Metadata = { title: 'Project Activity' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectActivityPage projectId={projectId} />;
}
