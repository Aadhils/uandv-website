import Link from 'next/link';

import { Footer } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { formatLocation, getMarketingSocialLinks, siteConfig } from '@/lib/site';

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
    <footer className="marketing-footer-glow relative bg-uv-footer text-uv-footer-foreground">
      <Footer
        className="marketing-footer-premium relative border-t border-uv-brand/20 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-uv-brand/50 before:to-transparent"
        brand={
          <div className="marketing-logo-breathe">
            <Logo invert className="text-white" />
          </div>
        }
        description={
          <>
            Your Business Growth Partner.
            <br />
            Premium software, branding, and growth — under one roof.
          </>
        }
        columns={[
          {
            title: 'Company',
            links: [
              { label: 'About U&V', href: '/why-uandv' },
              { label: 'What we build', href: '/why-uandv#solutions' },
              { label: 'Business Solutions', href: '/business-solutions' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'FAQ', href: '/faq' },
            ],
          },
          {
            title: 'Solutions',
            links: [
              { label: 'MLM Software', href: '/mlm' },
              {
                label: 'Digital Marketing',
                href: '/digital-marketing',
              },
              {
                label: 'FinTech',
                href: '/fintech',
              },
              { label: 'Startup', href: '/startup' },
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
              © 2026 {siteConfig.legalName}. All rights reserved. {formatLocation()}.
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
              <Link
                href="/contact"
                className="text-uv-soft-violet/80 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </p>
          </div>
        }
      />
    </footer>
  );
}
