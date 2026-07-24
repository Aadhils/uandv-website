import Link from 'next/link';

import { Footer } from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { getMarketingSocialLinks, siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <Footer
      brand={<Logo invert className="text-white" />}
      description={
        <>
          {siteConfig.footerDescription[0]}
          <br />
          {siteConfig.footerDescription[1]}
        </>
      }
      columns={[
        {
          title: 'Company',
          links: [
            { label: 'Services', href: '/services' },
            { label: 'Portfolio', href: '/portfolio' },
            { label: 'Why U&V', href: '/why-uandv' },
            { label: 'Business Solutions', href: '/business-consulting' },
            { label: 'MLM Solutions', href: '/solutions/mlm-software' },
            {
              label: 'Digital Marketing',
              href: '/solutions/digital-marketing',
            },
          ],
        },
        {
          title: 'Engage',
          links: [
            { label: 'Marketplace', href: '/marketplace' },
            { label: 'Partners', href: '/partners' },
            { label: 'Technologies', href: '/#technologies' },
            { label: 'Outcomes', href: '/#outcomes' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
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
      social={getMarketingSocialLinks()}
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
