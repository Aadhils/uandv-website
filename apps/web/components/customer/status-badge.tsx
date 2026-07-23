import { Badge, type BadgeProps } from '@uandv/ui';

const statusVariantMap: Record<string, BadgeProps['variant']> = {
  draft: 'secondary',
  active: 'info',
  on_hold: 'warning',
  completed: 'success',
  cancelled: 'error',
  submitted: 'secondary',
  in_review: 'info',
  quoted: 'warning',
  approved: 'success',
  closed: 'secondary',
  pending_signature: 'warning',
  signed: 'success',
  expired: 'error',
  renewal_due: 'warning',
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
  upcoming: 'info',
  failed: 'error',
  open: 'info',
  in_progress: 'info',
  waiting: 'warning',
  resolved: 'success',
  low: 'secondary',
  medium: 'info',
  high: 'warning',
  urgent: 'error',
  not_applicable: 'secondary',
  secure_vault: 'success',
  pending_setup: 'warning',
  blocked: 'error',
  healthy: 'success',
  due_soon: 'warning',
  at_risk: 'error',
  reminded: 'info',
  onboarding: 'info',
  inactive: 'secondary',
  invited: 'warning',
  sent: 'info',
  scheduled: 'warning',
  none: 'secondary',
  new: 'info',
  contacted: 'secondary',
  interested: 'info',
  meeting: 'warning',
  proposal: 'default',
  negotiation: 'warning',
  won: 'success',
  customer: 'success',
  lost: 'error',
  meeting_scheduled: 'warning',
  proposal_sent: 'default',
  follow_up_later: 'secondary',
  website: 'secondary',
  whatsapp: 'success',
  referral: 'info',
  campaign: 'default',
  walk_in: 'secondary',
  other: 'secondary',
  call: 'info',
  email: 'secondary',
  note: 'secondary',
  follow_up: 'info',
  stage_change: 'warning',
  discovery: 'info',
  proposal_review: 'default',
  new_assignment: 'info',
  follow_up_due: 'warning',
  follow_up_overdue: 'error',
  meeting_reminder: 'info',
  admin_comment: 'secondary',
  lead_reassigned: 'warning',
};

function humanize(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export type StatusBadgeProps = {
  status: string;
  label?: string;
};

/** Accessible status chip for tables and cards. */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  const text = label ?? humanize(status);
  return (
    <Badge variant={statusVariantMap[status] ?? 'secondary'}>
      <span className="sr-only">Status: </span>
      {text}
    </Badge>
  );
}
