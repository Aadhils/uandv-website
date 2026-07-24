import Link from 'next/link';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import type { CustomerAsset } from '@/lib/customer';

const typeOrder = [
  'website',
  'mobile_app',
  'logo',
  'brand',
  'domain',
  'hosting',
  'source_code',
  'credentials',
] as const;

const typeLabels: Record<string, string> = {
  website: 'Website',
  mobile_app: 'Mobile app',
  logo: 'Logo files',
  brand: 'Brand files',
  domain: 'Domain',
  hosting: 'Hosting',
  source_code: 'Source code',
  credentials: 'Credentials',
};

type AssetsSummarySectionProps = {
  assets: CustomerAsset[];
};

export function AssetsSummarySection({ assets }: AssetsSummarySectionProps) {
  const byType = typeOrder
    .map((type) => assets.find((asset) => asset.type === type))
    .filter(Boolean) as CustomerAsset[];

  return (
    <section aria-labelledby="assets-summary-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2
          id="assets-summary-heading"
          className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
        >
          My Business Assets
        </h2>
        <Link
          href="/dashboard/assets"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
        >
          View all assets
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {byType.map((asset) => (
          <Card key={asset.id} padding="none">
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm">
                  {typeLabels[asset.type] ?? asset.type}
                </CardTitle>
                <Badge variant="outline" className="shrink-0">
                  {asset.statusLabel.split('·')[0]?.trim() ?? 'Status'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-3">
              <p className="text-sm font-medium text-uv-foreground">
                {asset.name}
              </p>
              <StatusBadge
                status={asset.credentialStatus}
                label={
                  asset.credentialStatus === 'secure_vault'
                    ? 'Credentials vaulted'
                    : asset.credentialStatus === 'pending_setup'
                      ? 'Credentials pending'
                      : 'No credentials shown'
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-uv-foreground-subtle" role="note">
        Credentials are never displayed — vault status only.
      </p>
    </section>
  );
}
