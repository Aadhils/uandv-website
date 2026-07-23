import { StatsCard, type IconName } from '@uandv/ui';

import type { DashboardSummaryCounts } from '@/lib/customer';

type DashboardSummaryCardsProps = {
  summary: DashboardSummaryCounts;
};

const cards: Array<{
  key: keyof DashboardSummaryCounts;
  label: string;
  icon: IconName;
  hint: string;
}> = [
  {
    key: 'activeProjects',
    label: 'Active projects',
    icon: 'Briefcase',
    hint: 'In delivery',
  },
  {
    key: 'pendingApprovals',
    label: 'Pending approvals',
    icon: 'CircleAlert',
    hint: 'Needs your decision',
  },
  {
    key: 'pendingPayments',
    label: 'Pending payments',
    icon: 'Wallet',
    hint: 'Invoice(s) outstanding',
  },
  {
    key: 'openSupportTickets',
    label: 'Open support tickets',
    icon: 'MessageCircle',
    hint: 'Active conversations',
  },
  {
    key: 'documentsAwaitingAction',
    label: 'Documents awaiting action',
    icon: 'FileText',
    hint: 'Review or sign',
  },
  {
    key: 'upcomingRenewals',
    label: 'Upcoming renewals',
    icon: 'Calendar',
    hint: 'Due soon',
  },
];

export function DashboardSummaryCards({ summary }: DashboardSummaryCardsProps) {
  return (
    <section
      aria-label="Dashboard summary"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card) => (
        <StatsCard
          key={card.key}
          label={card.label}
          value={String(summary[card.key])}
          hint={card.hint}
          icon={card.icon}
        />
      ))}
    </section>
  );
}
