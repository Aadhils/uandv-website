import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import {
  formatDisplayDate,
  type RenewalItem,
  type RenewalKind,
} from '@/lib/customer';

const kindLabels: Record<RenewalKind, string> = {
  domain: 'Domain',
  hosting: 'Hosting',
  ssl: 'SSL',
  software_maintenance: 'Software maintenance',
  digital_business_card: 'Digital business card',
};

type UpcomingRenewalsSectionProps = {
  renewals: RenewalItem[];
};

export function UpcomingRenewalsSection({
  renewals,
}: UpcomingRenewalsSectionProps) {
  return (
    <section aria-labelledby="renewals-heading" className="space-y-4">
      <h2
        id="renewals-heading"
        className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl"
      >
        Upcoming Renewals
      </h2>

      {/* Mobile cards */}
      <ul className="grid gap-3 md:hidden" role="list">
        {renewals.map((item) => (
          <li
            key={item.id}
            className="rounded-uv-xl border border-uv-border bg-uv-card p-4 shadow-uv-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-uv-foreground-subtle">
                  {kindLabels[item.kind]}
                </p>
                <p className="font-medium text-uv-foreground">{item.name}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-uv-foreground-subtle">Renewal date</dt>
                <dd>{formatDisplayDate(item.renewalDate)}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-uv-foreground-subtle">Days remaining</dt>
                <dd className="tabular-nums">{item.daysRemaining}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-uv-xl border border-uv-border md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-uv-border bg-uv-background-subtle">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium text-uv-foreground-muted">
                Type
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-uv-foreground-muted">
                Item
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-uv-foreground-muted">
                Renewal date
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-uv-foreground-muted">
                Days remaining
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-uv-foreground-muted">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-uv-border bg-uv-card">
            {renewals.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{kindLabels[item.kind]}</td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">
                  {formatDisplayDate(item.renewalDate)}
                </td>
                <td className="px-4 py-3 tabular-nums">{item.daysRemaining}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-uv-foreground-subtle">Demo renewals only.</p>
    </section>
  );
}
