import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  demoEmployeeMeetings,
  formatDisplayDate,
  type MeetingStatus,
  type MeetingType,
} from '@/lib/employee';

const statusOrder: MeetingStatus[] = [
  'today',
  'upcoming',
  'completed',
  'cancelled',
];

const statusLabels: Record<MeetingStatus, string> = {
  today: 'Today',
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const typeLabels: Record<MeetingType, string> = {
  discovery: 'Discovery',
  demo: 'Demo',
  proposal_review: 'Proposal review',
  negotiation: 'Negotiation',
  onboarding: 'Onboarding',
};

export function EmployeeMeetingsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Meetings"
        description="Today, upcoming, completed, and cancelled meetings for your assigned work. No calendar integration."
      />

      {statusOrder.map((status) => {
        const items = demoEmployeeMeetings.filter(
          (meeting) => meeting.status === status,
        );
        return (
          <section key={status} aria-label={statusLabels[status]} className="space-y-3">
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
                      <p className="font-semibold text-uv-foreground">
                        {meeting.relatedName}
                      </p>
                      <Badge variant="outline">
                        {meeting.relatedKind === 'lead' ? 'Lead' : 'Customer'}
                      </Badge>
                      <StatusBadge
                        status={meeting.meetingType}
                        label={typeLabels[meeting.meetingType]}
                      />
                    </div>
                    <p className="mt-2 text-sm text-uv-foreground-muted">
                      {formatDisplayDate(meeting.date)} · {meeting.time}
                    </p>
                    <p className="mt-1 text-sm text-uv-foreground">
                      <span className="text-uv-foreground-subtle">Agenda: </span>
                      {meeting.agenda}
                    </p>
                    <p className="mt-1 text-sm text-uv-foreground-muted">
                      <span className="text-uv-foreground-subtle">Outcome: </span>
                      {meeting.outcome ?? '—'}
                    </p>
                    {(status === 'today' || status === 'upcoming') && (
                      <div className="mt-3">
                        <PlaceholderAction>Reschedule</PlaceholderAction>
                      </div>
                    )}
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
