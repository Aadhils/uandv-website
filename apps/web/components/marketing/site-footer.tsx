import Link from 'next/link';

import { Footer, buttonVariants, cn } from '@uandv/ui';

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
    <footer className="relative bg-uv-footer text-uv-footer-foreground">
      <div
        className="border-b border-white/10 bg-gradient-to-r from-[#08152F] via-[#102A56] to-[#3B1C78] py-10"
        aria-label="Contact call to action"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
              Ready to build?
            </p>
            <p className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-white sm:text-3xl">
              Let&apos;s discuss your next project.
            </p>
            <p className="mt-2 text-sm text-[#EDE9FE]/85">
              Based in {formatLocation()} · Serving businesses globally
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: 'lg' }), 'w-full justify-center sm:w-auto')}
            >
              Start Your Project
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'w-full justify-center border-white/30 bg-white/5 text-white hover:bg-white/10 sm:w-auto',
              )}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer
        className="relative border-t border-uv-brand/20 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-uv-brand/50 before:to-transparent"
        brand={<Logo invert className="text-white" />}
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
              { label: 'Home', href: '/' },
              { label: 'Why U&V', href: '/why-uandv' },
              { label: 'Services', href: '/services' },
              { label: 'Business Solutions', href: '/business' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'FAQ', href: '/faq' },
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
