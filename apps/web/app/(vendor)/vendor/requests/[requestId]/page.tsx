import type { Metadata } from 'next';

import { VendorServiceRequestDetailPage } from '@/components/vendor/service-request-detail-page';

type PageProps = {
  params: Promise<{ requestId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { requestId } = await params;
  return { title: `Opportunity · ${requestId}` };
}

export default async function VendorRequestDetailRoute({ params }: PageProps) {
  const { requestId } = await params;
  return <VendorServiceRequestDetailPage requestId={requestId} />;
}
