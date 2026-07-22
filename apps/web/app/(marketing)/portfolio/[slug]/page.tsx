import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseStudyPage } from '@/components/portfolio/case-study-page';
import {
  DEMO_PROJECT_LABEL,
  getAllCaseStudies,
  getCaseStudyBySlug,
} from '@/lib/portfolio';
import { siteConfig } from '@/lib/site';

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: 'Case study not found' };
  }

  const url = `${siteConfig.url}/portfolio/${study.slug}`;

  return {
    title: study.seo.title,
    description: study.seo.description,
    keywords: study.seo.keywords,
    alternates: {
      canonical: `/portfolio/${study.slug}`,
    },
    openGraph: {
      title: study.seo.title,
      description: study.seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: study.seo.title,
      description: study.seo.description,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyRouteProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    headline: study.title,
    description: study.seo.description,
    about: study.industry,
    creativeWorkStatus: DEMO_PROJECT_LABEL,
    genre: 'Product demo',
    author: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/portfolio/${study.slug}`,
    keywords: study.seo.keywords.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyPage study={study} />
    </>
  );
}
