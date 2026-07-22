'use client';

import { useMemo, useState } from 'react';

import { Button, Input } from '@uandv/ui';

import { DemoCard, DemoPageHeader } from '@/components/demo/mlm/ui';
import { MemberTree } from '@/components/demo/mlm/trees';
import { demoCurrentUser, demoMembers, demoReferral } from '@/lib/demo/mlm/mock-data';

export default function MlmReferralTreePage() {
  const [copied, setCopied] = useState(false);
  const directs = useMemo(
    () => demoMembers.filter((member) => member.sponsorId === demoCurrentUser.id),
    [],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(demoReferral.link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Referral Tree"
        description="Sponsor genealogy with expandable levels, plus your referral link tools."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DemoCard title="Direct referrals">
          <p className="text-3xl font-bold text-uv-foreground">{directs.length}</p>
        </DemoCard>
        <DemoCard title="Referral code">
          <p className="font-mono text-lg font-semibold text-uv-brand">{demoReferral.code}</p>
        </DemoCard>
        <DemoCard title="Conversion">
          <p className="text-3xl font-bold text-uv-foreground">{demoReferral.conversionRate}</p>
        </DemoCard>
      </div>

      <DemoCard title="Referral link" description="Copy and share the demo join URL.">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input value={demoReferral.link} readOnly className="flex-1" />
          <Button type="button" onClick={copyLink}>
            {copied ? 'Copied' : 'Copy link'}
          </Button>
        </div>
      </DemoCard>

      <DemoCard
        title="Sponsor genealogy"
        description={`${demoMembers.length} members in the mock referral network · root ${demoCurrentUser.id}`}
      >
        <MemberTree members={demoMembers} rootId={demoCurrentUser.id} />
      </DemoCard>
    </div>
  );
}
