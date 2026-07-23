import type { Metadata } from 'next';

import { AdminServiceRequestMatchPage } from '@/components/admin/service-request-match-page';

type PageProps = {
  params: Promise<{ requestId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { requestId } = await params;
  return { title: `Smart Matching · ${requestId}` };
}

export default async function AdminServiceRequestMatchRoute({
  params,
}: PageProps) {
  const { requestId } = await params;
  return <AdminServiceRequestMatchPage requestId={requestId} />;
}
