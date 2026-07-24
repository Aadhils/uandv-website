import { Badge } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoVendorMeetings,
  formatVendorDate,
  type VendorMeetingStatus,
  type VendorMeetingType,
} from '@/lib/vendor';

const statusOrder: VendorMeetingStatus[] = [
  'upcoming',
  'completed',
  'cancelled',
];

const statusLabels: Record<VendorMeetingStatus, string> = {
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const typeLabels: Record<VendorMeetingType, string> = {
  kickoff: 'Kickoff',
  review: 'Review',
  clarification: 'Clarification',
  handover: 'Handover',
};

export function VendorMeetingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <VendorPageHeader
        title="Meetings"
        description="Upcoming, completed, and cancelled meetings with Admin. No calendar integration."
      />

      {statusOrder.map((status) => {
        const items = demoVendorMeetings.filter((m) => m.status === status);
        return (
          <section
            key={status}
            aria-label={statusLabels[status]}
            className="space-y-3"
          >
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              {statusLabels[status]}
            </h2>
            {items.length === 0 ? (
              <p className="text-sm text-uv-foreground-muted">No meetings.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((meeting) => (
                  <li
                    key={meeting.id}
                    className="rounded-uv-xl border border-uv-border p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{meeting.title}</p>
                      <StatusBadge
                        status={meeting.meetingType}
                        label={typeLabels[meeting.meetingType]}
                      />
                    </div>
                    <p className="mt-2 text-sm text-uv-foreground-muted">
                      {formatVendorDate(meeting.date)} · {meeting.time}
                    </p>
                    <p className="mt-1 text-sm">
                      <span className="text-uv-foreground-subtle">Agenda: </span>
                      {meeting.agenda}
                    </p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">
                      <span className="text-uv-foreground-subtle">
                        Admin attendees:{' '}
                      </span>
                      {meeting.adminAttendees.join(', ')}
                    </p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">
                      <span className="text-uv-foreground-subtle">Outcome: </span>
                      {meeting.outcome ?? '—'}
                    </p>
                    {status === 'upcoming' ? (
                      <div className="mt-3">
                        <PlaceholderAction>Reschedule</PlaceholderAction>
                      </div>
                    ) : null}
                    {status === 'cancelled' ? (
                      <Badge variant="error" className="mt-2">
                        Cancelled
                      </Badge>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
