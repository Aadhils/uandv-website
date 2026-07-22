import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${siteConfig.legalName}.`,
  alternates: { canonical: '/legal/terms' },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Terms of Service',
          description: `Terms of Service for ${siteConfig.legalName}.`,
          path: '/legal/terms',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Terms of Service', path: '/legal/terms' },
          ],
        }}
      />
    <article className="prose-uv space-y-6">
      <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="text-uv-foreground-muted">
        Last updated: {new Date().getFullYear()}-07-22
      </p>
      <p>
        These terms govern your use of the {siteConfig.name} website operated by{' '}
        {siteConfig.legalName}. By using this site, you agree to these terms.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Services
      </h2>
      <p>
        Website content describes our business technology and growth services.
        Project work is governed by a separate proposal, statement of work, or
        agreement between you and U&V.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        No warranties on site content
      </h2>
      <p>
        Information on this website is provided for general communication. We
        strive for accuracy but do not warrant that all content is complete or
        current at all times.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Limitation of liability
      </h2>
      <p>
        To the fullest extent permitted by law, U&V is not liable for indirect or
        consequential damages arising from use of this website.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Contact
      </h2>
      <p>
        Questions about these terms:{' '}
        <a className="text-uv-brand underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>
    </article>
    </>
  );
}
