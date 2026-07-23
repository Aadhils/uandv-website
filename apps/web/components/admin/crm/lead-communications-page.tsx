import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoLeadCommunications,
  formatDisplayDate,
  type CommunicationChannel,
} from '@/lib/crm';

const channelLabels: Record<CommunicationChannel, string> = {
  call: 'Calls',
  whatsapp: 'WhatsApp',
  email: 'Email',
  note: 'Notes',
  meeting: 'Meetings',
};

export function LeadCommunicationsPage() {
  const ordered = [...demoLeadCommunications].sort((a, b) =>
    b.occurredAt.localeCompare(a.occurredAt),
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Communication Timeline"
        description="Calls, WhatsApp, email, and notes across leads. Demo log only — no messaging integrations."
      />

      <div className="flex flex-wrap gap-2" aria-label="Channels">
        {(Object.keys(channelLabels) as CommunicationChannel[]).map(
          (channel) => (
            <Badge key={channel} variant="outline">
              {channelLabels[channel]}
            </Badge>
          ),
        )}
      </div>

      <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
        {ordered.map((item) => (
          <li key={item.id} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                status={item.channel}
                label={channelLabels[item.channel]}
              />
              <Badge variant="secondary">
                {formatDisplayDate(item.occurredAt)}
              </Badge>
            </div>
            <p className="mt-2 font-semibold text-uv-foreground">
              {item.leadName}
            </p>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {item.summary}
            </p>
            <p className="mt-1 text-xs text-uv-foreground-subtle">
              Logged by {item.author}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
