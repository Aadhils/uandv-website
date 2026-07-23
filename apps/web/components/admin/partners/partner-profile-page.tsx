import { Badge, StatsCard } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requirePartner } from '@/components/admin/partners/require-partner';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  PARTNER_CATEGORY_LABELS,
  getPartnerPerformance,
} from '@/lib/partners';

export function AdminPartnerProfilePage({ partnerId }: { partnerId: string }) {
  const partner = requirePartner(partnerId);
  const performance = getPartnerPerformance(partnerId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Partner Profile"
        description="Directory profile with verification, skills, SLA, and commission placeholders."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Profile metrics">
        <StatsCard label="Rating" value={partner.rating.toFixed(1)} icon="Sparkles" />
        <StatsCard
          label="Performance"
          value={String(partner.performanceScore)}
          hint="Score / 100"
          icon="TrendingUp"
        />
        <StatsCard
          label="Experience"
          value={`${partner.experienceYears} yrs`}
          icon="Briefcase"
        />
        <StatsCard
          label="SLA"
          value={`${partner.slaHours}h`}
          hint="Response target"
          icon="Clock"
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-3 rounded-uv-xl border border-uv-border p-5">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Company details
          </h2>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Category</dt>
              <dd>{PARTNER_CATEGORY_LABELS[partner.category]}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Contact</dt>
              <dd>{partner.contactPerson}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Service area</dt>
              <dd>{partner.serviceArea}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Commission</dt>
              <dd className="capitalize">{partner.commissionType}</dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Documents</dt>
              <dd>
                <StatusBadge status={partner.documentsStatus} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-uv-foreground-subtle">
                Bank verification
              </dt>
              <dd>
                <StatusBadge status={partner.bankVerificationStatus} />
              </dd>
            </div>
          </dl>
          <p className="text-sm text-uv-foreground-muted">{partner.summary}</p>
        </section>

        <section className="space-y-3 rounded-uv-xl border border-uv-border p-5">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {partner.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
          {performance ? (
            <p className="text-sm text-uv-foreground-muted">
              On-time delivery {performance.onTimeDeliveryPercent}% · Response{' '}
              {performance.responseTimeHours}h avg
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
