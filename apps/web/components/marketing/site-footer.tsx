import Link from 'next/link';

import { Footer } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { getMarketingSocialLinks, siteConfig } from '@/lib/site';

const launchSocialPlatforms = new Set([
  'Facebook',
  'YouTube',
  'LinkedIn',
  'X / Twitter',
]);

export function SiteFooter() {
  const social = getMarketingSocialLinks().filter((link) =>
    launchSocialPlatforms.has(link.label),
  );

  return (
    <Footer
      className="relative border-t border-uv-brand/20 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-uv-brand/50 before:to-transparent"
      brand={<Logo invert className="text-white" />}
      description={
        <>
          Your Business Growth Partner.
          <br />
          Everything your business needs under one roof.
        </>
      }
      columns={[
        {
          title: 'Company',
          links: [
            { label: 'Why U&V', href: '/why-uandv' },
            { label: 'Services', href: '/services' },
            { label: 'Business Solutions', href: '/business' },
            { label: 'Portfolio', href: '/portfolio' },
          ],
        },
        {
          title: 'Solutions',
          links: [
            { label: 'MLM Software', href: '/solutions/mlm-software' },
            {
              label: 'Digital Marketing',
              href: '/solutions/digital-marketing',
            },
            {
              label: 'Startup Support',
              href: '/services/startup-business-consulting',
            },
          ],
        },
        {
          title: 'Contact',
          links: [
            { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
            { label: 'WhatsApp', href: siteConfig.whatsapp },
            { label: 'Contact page', href: '/contact' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Service', href: '/legal/terms' },
          ],
        },
      ]}
      social={social}
      bottom={
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.legalName}. All rights reserved. Tamil Nadu,
            India.
          </p>
          <p className="flex flex-wrap gap-4">
            <Link
              href="/legal/privacy"
              className="text-uv-soft-violet/80 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-uv-soft-violet/80 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </p>
        </div>
      }
    />
  );
}
