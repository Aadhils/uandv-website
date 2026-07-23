import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import { demoAssets } from '@/lib/customer';

const typeLabels: Record<string, string> = {
  website: 'Website',
  mobile_app: 'Mobile app',
  logo: 'Logo files',
  brand: 'Brand assets',
  domain: 'Domain',
  hosting: 'Hosting',
  source_code: 'Source code',
  credentials: 'Credentials',
};

const credentialLabels: Record<string, string> = {
  not_applicable: 'No credentials',
  secure_vault: 'Vaulted',
  pending_setup: 'Pending setup',
};

export function CustomerAssetsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="My Assets"
        description="Digital properties managed with U&V. Credentials stay vaulted — secrets are never shown."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {demoAssets.map((asset) => (
          <Card key={asset.id} padding="none">
            <CardHeader className="pb-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <CardTitle className="text-base">{asset.name}</CardTitle>
                <Badge variant="outline">
                  {typeLabels[asset.type] ?? asset.type}
                </Badge>
              </div>
              <CardDescription>{asset.statusLabel}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <p className="text-sm text-uv-foreground-muted">{asset.notes}</p>
              <StatusBadge
                status={asset.credentialStatus}
                label={`Credentials: ${credentialLabels[asset.credentialStatus]}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <p
        className="rounded-uv-lg border border-uv-warning/30 bg-uv-warning-muted/40 px-4 py-3 text-sm text-uv-foreground"
        role="note"
      >
        Security note: this page never displays passwords, API keys, or other
        secrets — even in demo mode.
      </p>
    </div>
  );
}
