import { formatLocation, siteConfig } from '@/lib/site';

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.email,
        foundingDate: String(siteConfig.founded),
        sameAs: [siteConfig.linkedin, siteConfig.whatsapp],
        address: {
          '@type': 'PostalAddress',
          addressRegion: siteConfig.location.region,
          addressCountry: 'IN',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: siteConfig.email,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Tamil'],
            url: siteConfig.whatsapp,
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': `${siteConfig.url}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'ProfessionalService',
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        areaServed: formatLocation(),
        address: {
          '@type': 'PostalAddress',
          addressRegion: siteConfig.location.region,
          addressCountry: 'IN',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
