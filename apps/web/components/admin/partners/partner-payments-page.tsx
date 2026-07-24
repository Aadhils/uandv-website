import { StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import {
  formatPartnerDate,
  formatPartnerInr,
  getPaymentSummaryForPartner,
} from '@/lib/partners';

export function AdminPartnerPaymentsPage({
  partnerId,
}: {
  partnerId: string;
}) {
  requirePartner(partnerId);
  const summary = getPaymentSummaryForPartner(partnerId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Payment Summary"
        description="Partner earnings placeholders. No payment gateway. Separate from customer invoices."
      />
      {summary ? (
        <>
          <section
            className="grid gap-4 sm:grid-cols-3"
            aria-label="Partner payment summary"
          >
            <StatsCard
              label="Earned"
              value={formatPartnerInr(summary.earnedInr)}
              icon="TrendingUp"
            />
            <StatsCard
              label="Pending"
              value={formatPartnerInr(summary.pendingInr)}
              icon="Clock"
            />
            <StatsCard
              label="Paid"
              value={formatPartnerInr(summary.paidInr)}
              icon="Check"
            />
          </section>
          <p className="text-sm text-uv-foreground-muted">{summary.notes}</p>
          <p className="text-xs text-uv-foreground-subtle">
            Last payout:{' '}
            {summary.lastPayoutAt
              ? formatPartnerDate(summary.lastPayoutAt)
              : 'None yet'}
          </p>
        </>
      ) : (
        <p className="text-sm text-uv-foreground-muted">
          No payment summary recorded for this partner.
        </p>
      )}
    </div>
  );
}
