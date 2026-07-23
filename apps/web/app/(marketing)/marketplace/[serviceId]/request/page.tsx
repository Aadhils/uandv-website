import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MarketplaceServiceRequestPage } from '@/components/partners';
import {
  demoMarketplaceServices,
  getMarketplaceServiceById,
} from '@/lib/partners';

type PageProps = {
  params: Promise<{ serviceId: string }>;
};

export function generateStaticParams() {
  return demoMarketplaceServices.map((service) => ({
    serviceId: service.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getMarketplaceServiceById(serviceId);
  return {
    title: service
      ? `Request · ${service.title}`
      : 'Request service',
  };
}

export default async function MarketplaceServiceRequestRoute({
  params,
}: PageProps) {
  const { serviceId } = await params;
  const service = getMarketplaceServiceById(serviceId);
  if (!service) notFound();
  return <MarketplaceServiceRequestPage service={service} />;
}
