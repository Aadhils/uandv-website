'use client';

import { useMemo, useState } from 'react';

import { Icon, cn } from '@uandv/ui';

import type { BinaryNode, MlmMember } from '@/lib/demo/mlm/types';
import { getDownline } from '@/lib/demo/mlm/mock-data';

import { StatusBadge } from './ui';

export function MemberTree({ members, rootId }: { members: MlmMember[]; rootId: string }) {
  const root = members.find((member) => member.id === rootId);
  if (!root) return null;

  return (
    <div className="space-y-3">
      <MemberTreeNode member={root} members={members} depth={0} />
    </div>
  );
}

function MemberTreeNode({
  member,
  members,
  depth,
}: {
  member: MlmMember;
  members: MlmMember[];
  depth: number;
}) {
  const children = getDownline(member.id);
  const [open, setOpen] = useState(depth < 2);

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 16 }}>
      <div className="flex items-start gap-2 rounded-uv-xl border border-uv-border bg-uv-background p-3 sm:items-center">
        {children.length > 0 ? (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-uv-md border border-uv-border text-uv-foreground-muted"
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            <Icon name={open ? 'ChevronDown' : 'ChevronRight'} size="sm" />
          </button>
        ) : (
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0" />
        )}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-uv-brand-muted text-sm font-semibold text-uv-brand">
          {member.avatarInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-uv-foreground">{member.name}</p>
            <StatusBadge status={member.status} />
          </div>
          <p className="mt-1 text-xs text-uv-foreground-muted sm:text-sm">
            {member.id} · {member.rank} · PV {member.personalVolume} · Referrals{' '}
            {member.referrals}
          </p>
        </div>
      </div>
      {open && children.length > 0 ? (
        <div className="mt-2 space-y-2 border-l border-uv-border pl-2 sm:pl-3">
          {children.map((child) => (
            <MemberTreeNode
              key={child.id}
              member={child}
              members={members}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function BinaryTreeView({ root }: { root: BinaryNode }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="mx-auto flex min-w-[720px] flex-col items-center gap-8 py-4">
        <BinaryNodeCard node={root} highlight />
        <div className="grid w-full grid-cols-2 gap-6">
          <BinaryBranch node={root.left} side="Left" />
          <BinaryBranch node={root.right} side="Right" />
        </div>
      </div>
    </div>
  );
}

function BinaryBranch({
  node,
  side,
}: {
  node: BinaryNode | null;
  side: 'Left' | 'Right';
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-uv-2xl border border-dashed border-uv-border bg-uv-background-subtle/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-uv-brand">
        {side} leg
      </p>
      {node ? <BinarySubtree node={node} /> : <EmptySlot label={`${side} open`} />}
    </div>
  );
}

function BinarySubtree({ node }: { node: BinaryNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <BinaryNodeCard node={node} />
      <div className="grid w-full grid-cols-2 gap-3">
        {node.left ? (
          <BinarySubtree node={node.left} />
        ) : (
          <EmptySlot label="Left open" />
        )}
        {node.right ? (
          <BinarySubtree node={node.right} />
        ) : (
          <EmptySlot label="Right open" />
        )}
      </div>
    </div>
  );
}

function BinaryNodeCard({
  node,
  highlight = false,
}: {
  node: BinaryNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        'w-full max-w-[220px] rounded-uv-xl border px-4 py-3 text-center shadow-uv-sm',
        highlight
          ? 'border-uv-brand/50 bg-uv-brand-muted'
          : 'border-uv-border bg-uv-background',
      )}
    >
      <p className="font-semibold text-uv-foreground">{node.name}</p>
      <p className="mt-1 text-xs text-uv-foreground-muted">
        {node.id} · {node.rank}
      </p>
      <p className="mt-2 text-sm font-medium text-uv-brand">
        Vol {node.volume.toLocaleString('en-IN')}
      </p>
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex min-h-[88px] w-full max-w-[220px] items-center justify-center rounded-uv-xl border border-dashed border-uv-border bg-uv-background px-3 text-center text-xs text-uv-foreground-muted">
      {label}
    </div>
  );
}

export function IncomeBars({
  rows,
}: {
  rows: { period: string; total: number }[];
}) {
  const max = useMemo(
    () => Math.max(...rows.map((row) => row.total), 1),
    [rows],
  );

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.period}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-uv-foreground">{row.period}</span>
            <span className="text-uv-foreground-muted">
              ₹{row.total.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-uv-background-muted">
            <div
              className="h-full rounded-full uv-brand-gradient"
              style={{ width: `${Math.round((row.total / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
