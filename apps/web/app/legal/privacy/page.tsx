import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.legalName}.`,
  alternates: { canonical: '/legal/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        mode="page"
        page={{
          title: 'Privacy Policy',
          description: `Privacy Policy for ${siteConfig.legalName}.`,
          path: '/legal/privacy',
          breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/legal/privacy' },
          ],
        }}
      />
    <article className="prose-uv space-y-6">
      <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="text-uv-foreground-muted">
        Last updated: {new Date().getFullYear()}-07-22
      </p>
      <p>
        {siteConfig.legalName} (“U&V”, “we”, “us”) respects your privacy. This
        policy explains how we collect, use, and protect information when you
        visit {siteConfig.url} or contact us about our services.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Information we collect
      </h2>
      <p>
        When you inquire through our website, email, phone, WhatsApp, or
        LinkedIn, we may receive your name, email address, phone number,
        company name, and the contents of your message. We also receive standard
        technical data such as browser type and approximate location from
        hosting/analytics providers when enabled.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        How we use information
      </h2>
      <p>
        We use your information to respond to inquiries, deliver services,
        improve our website, and communicate about projects. We do not sell your
        personal information.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Sharing
      </h2>
      <p>
        We may share information with trusted processors (for example hosting,
        email, or analytics providers) solely to operate our business, or when
        required by law.
      </p>
      <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold">
        Contact
      </h2>
      <p>
        For privacy questions, contact{' '}
        <a className="text-uv-brand underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>
    </article>
    </>
  );
}
