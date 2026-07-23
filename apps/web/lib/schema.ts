import { siteConfig } from '@/lib/site';

export type BreadcrumbItem = {
  name: string;
  path?: string;
};

export type WebPageSchemaInput = {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: BreadcrumbItem[];
};

/** Schema.org sameAs profiles (canonical for structured data). */
export const schemaSameAs = [
  'https://www.linkedin.com/company/uandv',
  'https://www.facebook.com/uandv',
  'https://x.com/uandv',
  'https://www.youtube.com/@uandv',
] as const;

export const schemaServices = [
  {
    name: 'Website Development',
    path: '/services/website-development',
    description:
      'Premium marketing sites, business websites, and web platforms engineered for speed, SEO, and conversions.',
  },
  {
    name: 'Mobile App Development',
    path: '/services/mobile-app-development',
    description:
      'iOS and Android mobile apps for customer journeys, operations, and multi-sided business workflows.',
  },
  {
    name: 'AI Automation',
    path: '/services/ai-automation',
    description:
      'AI assistants, workflow automation, and intelligent document processing designed for real business outcomes.',
  },
  {
    name: 'ERP Software',
    path: '/services/erp-software',
    description:
      'ERP systems that connect inventory, purchasing, finance, HR, and operations into one source of truth.',
  },
  {
    name: 'CRM Software',
    path: '/services/crm-software',
    description:
      'CRM platforms that organize leads, follow-ups, deals, and customer history for sales and support teams.',
  },
  {
    name: 'Enterprise Software',
    path: '/services/custom-software-development',
    description:
      'Custom enterprise platforms, portals, and internal tools that automate operations and connect systems.',
  },
  {
    name: 'MLM Software',
    path: '/services/mlm-software',
    description:
      'MLM and network marketing platforms with genealogy trees, commission plans, wallets, and member dashboards.',
  },
  {
    name: 'Digital Marketing',
    path: '/solutions/digital-marketing',
    description:
      'Performance-minded digital marketing across SEO, content, ads, and conversion systems.',
  },
  {
    name: 'UI/UX Design',
    path: '/services/branding-logo-design',
    description:
      'Brand identity, UI/UX, and visual systems that communicate trust and differentiation.',
  },
  {
    name: 'Business Solutions',
    path: '/business-consulting',
    description:
      'End-to-end business solutions spanning strategy, technology, automation, and long-term growth partnership.',
  },
] as const;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized === '/' ? '' : normalized}`;
}

export function organizationId() {
  return `${siteConfig.url}/#organization`;
}

export function websiteId() {
  return `${siteConfig.url}/#website`;
}

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': organizationId(),
    name: 'U&V Technologies',
    alternateName: 'U&V',
    url: 'https://uandv.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://uandv.com/icon.svg',
      contentUrl: 'https://uandv.com/icon.svg',
    },
    image: 'https://uandv.com/icon.svg',
    email: 'info@uandv.com',
    sameAs: [...schemaSameAs],
    foundingDate: String(siteConfig.founded),
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.location.region,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'info@uandv.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: 'https://uandv.com',
    name: 'U&V Technologies',
    alternateName: 'U&V',
    description: siteConfig.description,
    publisher: { '@id': organizationId() },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://uandv.com/services?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildServiceSchema(service: {
  name: string;
  path: string;
  description: string;
}) {
  const url = absoluteUrl(service.path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    description: service.description,
    url,
    provider: { '@id': organizationId() },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: service.name,
  };
}

export function buildAllServiceSchemas() {
  return schemaServices.map((service) => buildServiceSchema(service));
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : {}),
    })),
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  breadcrumbs,
}: WebPageSchemaInput) {
  const url = absoluteUrl(path);
  const crumbItems =
    breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs
      : [{ name: title, path }];

  return [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': websiteId() },
      about: { '@id': organizationId() },
      inLanguage: 'en-IN',
      breadcrumb: {
        '@id': `${url}#breadcrumb`,
      },
    },
    {
      ...buildBreadcrumbListSchema(crumbItems),
      '@id': `${url}#breadcrumb`,
    },
  ];
}

export function buildGlobalSchemaGraph() {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    ...buildAllServiceSchemas(),
  ];
}

export function buildPageSchemaGraph(input: WebPageSchemaInput) {
  return [...buildGlobalSchemaGraph(), ...buildWebPageSchema(input)];
}

export function toJsonLdDocument(graph: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Validates that a JSON-LD document is serializable and structurally sound. */
export function validateJsonLd(document: unknown): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    JSON.stringify(document);
  } catch {
    return { ok: false, errors: ['Document is not JSON-serializable.'] };
  }

  if (!document || typeof document !== 'object') {
    return { ok: false, errors: ['Document must be an object.'] };
  }

  const doc = document as Record<string, unknown>;
  if (doc['@context'] !== 'https://schema.org') {
    errors.push('@context must be https://schema.org');
  }

  const graph = doc['@graph'];
  if (!Array.isArray(graph) || graph.length === 0) {
    errors.push('@graph must be a non-empty array');
    return { ok: false, errors };
  }

  for (const [index, node] of graph.entries()) {
    if (!node || typeof node !== 'object') {
      errors.push(`@graph[${index}] must be an object`);
      continue;
    }
    const typed = node as Record<string, unknown>;
    if (!typed['@type']) {
      errors.push(`@graph[${index}] is missing @type`);
    }
  }

  const types = new Set(
    graph
      .map((node) =>
        node && typeof node === 'object'
          ? String((node as Record<string, unknown>)['@type'] ?? '')
          : '',
      )
      .filter(Boolean),
  );

  const isPageGraph = types.has('WebPage');
  if (isPageGraph && !types.has('BreadcrumbList')) {
    errors.push('Page graphs must include BreadcrumbList');
  }

  const organization = graph.find(
    (node) =>
      node &&
      typeof node === 'object' &&
      (node as Record<string, unknown>)['@type'] === 'Organization',
  ) as Record<string, unknown> | undefined;

  if (organization) {
    if (organization.name !== 'U&V Technologies') {
      errors.push('Organization.name must be U&V Technologies');
    }
    if (organization.url !== 'https://uandv.com') {
      errors.push('Organization.url must be https://uandv.com');
    }
    if (organization.email !== 'info@uandv.com') {
      errors.push('Organization.email must be info@uandv.com');
    }
    const logo = organization.logo as Record<string, unknown> | undefined;
    if (!logo || logo.url !== 'https://uandv.com/icon.svg') {
      errors.push('Organization.logo.url must be https://uandv.com/icon.svg');
    }
    const sameAs = organization.sameAs;
    if (
      !Array.isArray(sameAs) ||
      sameAs.length !== schemaSameAs.length ||
      schemaSameAs.some((url, i) => sameAs[i] !== url)
    ) {
      errors.push('Organization.sameAs must match the canonical social profiles');
    }
  }

  const website = graph.find(
    (node) =>
      node &&
      typeof node === 'object' &&
      (node as Record<string, unknown>)['@type'] === 'WebSite',
  ) as Record<string, unknown> | undefined;

  if (website && !website.potentialAction) {
    errors.push('WebSite must include SearchAction potentialAction');
  }

  const services = graph.filter(
    (node) =>
      node &&
      typeof node === 'object' &&
      (node as Record<string, unknown>)['@type'] === 'Service',
  );
  if (services.length < 10) {
    errors.push('Expected at least 10 Service schema nodes');
  }

  return { ok: errors.length === 0, errors };
}
