import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatDisplayDate,
  formatInr,
  type BusinessPaymentSnapshot,
} from '@/lib/customer';

type PaymentSummarySectionProps = {
  snapshot: BusinessPaymentSnapshot;
};

export function PaymentSummarySection({
  snapshot,
}: PaymentSummarySectionProps) {
  return (
    <section aria-labelledby="payment-summary-heading">
      <Card padding="none">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle id="payment-summary-heading" className="text-base">
              Payment Summary
            </CardTitle>
            <StatusBadge
              status={snapshot.status}
              label={snapshot.statusLabel}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-uv-foreground-subtle">
                Total project value
              </dt>
              <dd className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                {formatInr(snapshot.totalProjectValueInr)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Amount paid</dt>
              <dd className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                {formatInr(snapshot.amountPaidInr)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Balance amount</dt>
              <dd className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                {formatInr(snapshot.balanceInr)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">
                Next payment due
              </dt>
              <dd className="font-medium text-uv-foreground">
                {formatDisplayDate(snapshot.nextPaymentDueDate)}
              </dd>
            </div>
          </dl>
          <p className="text-xs text-uv-foreground-subtle">
            Demo ledger only — no payment gateway connected.
          </p>
          <Link
            href="/dashboard/payments"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            View payments
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
