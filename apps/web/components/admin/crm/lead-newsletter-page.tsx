import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoNewsletterCampaigns,
  formatDisplayDate,
} from '@/lib/crm';

export function LeadNewsletterPage() {
  const campaigns = demoNewsletterCampaigns;
  const drafts = campaigns.filter((c) => c.status === 'draft');
  const sent = campaigns.filter((c) => c.status === 'sent');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <AdminPageHeader
        title="Newsletter Center"
        description="Campaign list, drafts, and sent history. Demo UI only — no email service."
      />

      <section aria-label="Campaign list" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Campaign list
          </h2>
          <PlaceholderAction>New campaign</PlaceholderAction>
        </div>
        <ResponsiveDataList
          rows={campaigns}
          getRowId={(row) => row.id}
          mobileTitle={(row) => row.name}
          columns={[
            {
              key: 'name',
              header: 'Campaign',
              hideOnMobile: true,
              render: (row) => (
                <div>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-uv-foreground-muted">{row.id}</p>
                </div>
              ),
            },
            {
              key: 'audience',
              header: 'Audience',
              render: (row) => row.audienceLabel,
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              key: 'updated',
              header: 'Updated',
              render: (row) => formatDisplayDate(row.updatedAt),
            },
            {
              key: 'sent',
              header: 'Sent',
              render: (row) =>
                row.sentAt ? formatDisplayDate(row.sentAt) : '—',
            },
          ]}
        />
      </section>

      <section aria-label="Drafts" className="space-y-3">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Drafts
        </h2>
        {drafts.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No drafts.</p>
        ) : (
          <ul className="space-y-2">
            {drafts.map((draft) => (
              <li
                key={draft.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-4 py-3"
              >
                <div>
                  <p className="font-medium">{draft.name}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {draft.audienceLabel}
                  </p>
                </div>
                <Badge variant="secondary">Draft</Badge>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Sent history" className="space-y-3">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Sent history
        </h2>
        {sent.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">No sent campaigns.</p>
        ) : (
          <ul className="space-y-2">
            {sent.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-4 py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    Sent {item.sentAt ? formatDisplayDate(item.sentAt) : '—'}
                  </p>
                </div>
                <Badge variant="info">Sent</Badge>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
