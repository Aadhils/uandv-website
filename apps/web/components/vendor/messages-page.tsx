import { Badge } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatVendorDateTime,
  getVendorMessages,
  type VendorMessageKind,
} from '@/lib/vendor';

const kindLabels: Record<VendorMessageKind, string> = {
  admin_message: 'Admin message',
  internal_note: 'Internal note',
  clarification: 'Clarification',
  revision_feedback: 'Revision feedback',
  meeting_summary: 'Meeting summary',
};

export function VendorMessagesPage() {
  const rows = getVendorMessages();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <VendorPageHeader
        title="Messages"
        description="Chronological Admin communication for your assignments. Reply is a placeholder — no real messaging service."
        actions={<PlaceholderAction>Reply</PlaceholderAction>}
      />

      <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
        {rows.map((item) => (
          <li key={item.id} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                status={item.kind}
                label={kindLabels[item.kind]}
              />
              <Badge variant="secondary">
                {formatVendorDateTime(item.occurredAt)}
              </Badge>
              <Badge variant="outline">Demo</Badge>
            </div>
            <p className="mt-2 font-semibold text-uv-foreground">{item.title}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{item.body}</p>
            <p className="mt-1 text-xs text-uv-foreground-subtle">
              {item.author} · {item.relatedLabel}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
