import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServicePage } from '@/components/services/service-page';
import {
  getAllServices,
  getServiceBySlug,
} from '@/lib/services';
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seo.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
      email: siteConfig.email,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${siteConfig.location.region}, ${siteConfig.location.country}`,
      },
    },
    areaServed: 'IN',
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePage service={service} />
    </>
  );
}
