'use client';

import { useMemo, useState } from 'react';

import { Input } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoCurrentUser, getAllDownlineFlat } from '@/lib/demo/mlm/mock-data';

export default function MlmDownlinePage() {
  const [query, setQuery] = useState('');
  const downline = useMemo(() => getAllDownlineFlat(demoCurrentUser.id), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return downline;
    return downline.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.id.toLowerCase().includes(q) ||
        member.rank.toLowerCase().includes(q),
    );
  }, [downline, query]);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Downline List"
        description="Flat searchable list of all members under your genealogy."
      />

      <DemoCard
        title="Team roster"
        description={`${downline.length} downline members · search by name, ID, or rank`}
        action={
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search downline…"
            className="w-full sm:w-64"
          />
        }
      >
        <DemoTable
          headers={['Member', 'ID', 'Rank', 'Sponsor', 'PV', 'Status', 'Joined']}
          rows={filtered.map((member) => [
            member.name,
            member.id,
            member.rank,
            member.sponsorId ?? '—',
            member.personalVolume.toLocaleString('en-IN'),
            <StatusBadge key={`${member.id}-status`} status={member.status} />,
            member.joinDate,
          ])}
        />
        {filtered.length === 0 ? (
          <p className="mt-4 text-sm text-uv-foreground-muted">No members match this search.</p>
        ) : null}
      </DemoCard>

      <DemoCard title="Volume summary">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Downline PV
            </p>
            <p className="mt-1 text-xl font-bold text-uv-foreground">
              {downline
                .reduce((sum, member) => sum + member.personalVolume, 0)
                .toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Left volume
            </p>
            <p className="mt-1 text-xl font-bold text-uv-foreground">
              {demoCurrentUser.leftVolume.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Right volume
            </p>
            <p className="mt-1 text-xl font-bold text-uv-foreground">
              {demoCurrentUser.rightVolume.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </DemoCard>
    </div>
  );
}
