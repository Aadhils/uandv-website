import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/seo/json-ld';
import { ServicePage } from '@/components/services/service-page';
import {
  getAllServices,
  getServiceBySlug,
} from '@/lib/services';
import { organizationId } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service not found',
    };
  }

  const url = `${siteConfig.url}/services/${service.slug}`;

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const url = `${siteConfig.url}/services/${service.slug}`;

  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: service.seo.title,
          description: service.seo.description,
          path: `/services/${service.slug}`,
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ],
        }}
        extra={[
          {
            '@type': 'Service',
            '@id': `${url}#page-service`,
            name: service.title,
            description: service.seo.description,
            url,
            provider: { '@id': organizationId() },
            areaServed: {
              '@type': 'Country',
              name: 'India',
            },
            serviceType: service.title,
          },
        ]}
      />
      <ServicePage service={service} />
    </>
  );
}
