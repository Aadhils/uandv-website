import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import {
  formatPartnerDateTime,
  getCommunicationsForPartner,
} from '@/lib/partners';

export function AdminPartnerCommunicationsPage({
  partnerId,
}: {
  partnerId: string;
}) {
  requirePartner(partnerId);
  const rows = getCommunicationsForPartner(partnerId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Communication Timeline"
        description="Calls, email, WhatsApp, meetings, and internal notes with this partner. Demo only."
      />
      {rows.length === 0 ? (
        <p className="text-sm text-uv-foreground-muted">No communications yet.</p>
      ) : (
        <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
          {rows.map((item) => (
            <li key={item.id} className="relative pb-6 last:pb-0">
              <span
                className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{item.channel.replaceAll('_', ' ')}</Badge>
                <span className="text-xs text-uv-foreground-subtle">
                  {formatPartnerDateTime(item.occurredAt)}
                </span>
              </div>
              <p className="mt-2 font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-uv-foreground-muted">
                {item.detail}
              </p>
              <p className="mt-1 text-xs text-uv-foreground-subtle">
                {item.actorName}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
