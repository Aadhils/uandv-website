'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants, cn } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  type Partner,
} from '@/lib/partners';

const tabs = [
  { href: '', label: 'Profile' },
  { href: 'performance', label: 'Performance' },
  { href: 'projects', label: 'Assigned Projects' },
  { href: 'payments', label: 'Payment Summary' },
  { href: 'documents', label: 'Documents' },
  { href: 'communications', label: 'Communication' },
] as const;

export function AdminPartnerDetailNav({
  partnerId,
  partner,
}: {
  partnerId: string;
  partner: Partner;
}) {
  const pathname = usePathname();
  const base = `/admin/partners/${partnerId}`;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-uv-foreground-subtle">{partner.id}</p>
        <h1 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold sm:text-2xl">
          {partner.companyName}
        </h1>
        <p className="mt-1 text-sm text-uv-foreground-muted">
          {PARTNER_CATEGORY_LABELS[partner.category]} · {partner.city},{' '}
          {partner.state}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge status={partner.verificationStatus} />
          <StatusBadge status={partner.availability} />
        </div>
      </div>
      <nav
        aria-label="Partner sections"
        className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      >
        {tabs.map((tab) => {
          const href = tab.href ? `${base}/${tab.href}` : base;
          const active =
            tab.href === ''
              ? pathname === base
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                buttonVariants({
                  variant: active ? 'secondary' : 'ghost',
                  size: 'sm',
                }),
                'shrink-0',
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
