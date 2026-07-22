'use client';

import { useState } from 'react';

import { Button } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoKycDocuments } from '@/lib/demo/mlm/mock-data';
import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import type { KycDocument } from '@/lib/demo/mlm/types';

export default function MlmKycPage() {
  const { session } = useMlmDemoAuth();
  const isAdmin = session?.role === 'admin';
  const [docs, setDocs] = useState<KycDocument[]>(demoKycDocuments);
  const [message, setMessage] = useState<string | null>(null);

  const submitPending = () => {
    setDocs((current) =>
      current.map((doc) =>
        doc.status === 'missing'
          ? { ...doc, status: 'pending', updatedAt: '2026-07-22' }
          : doc,
      ),
    );
    setMessage('KYC documents submitted for review (demo only).');
  };

  const approvePending = () => {
    setDocs((current) =>
      current.map((doc) =>
        doc.status === 'pending'
          ? { ...doc, status: 'verified', updatedAt: '2026-07-22' }
          : doc,
      ),
    );
    setMessage('Pending KYC items marked verified (admin demo action).');
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="KYC"
        description={
          isAdmin
            ? 'Review and approve member identity documents in this demo queue.'
            : 'Upload and track identity verification documents for payout eligibility.'
        }
        actions={
          isAdmin ? (
            <Button type="button" onClick={approvePending}>
              Approve pending
            </Button>
          ) : (
            <Button type="button" onClick={submitPending}>
              Submit missing docs
            </Button>
          )
        }
      />

      {message ? (
        <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">
          {message}
        </p>
      ) : null}

      <DemoCard title="Document checklist" description="Mock KYC statuses for the demo member.">
        <DemoTable
          headers={['Document', 'Status', 'Updated']}
          rows={docs.map((doc) => [
            doc.name,
            <StatusBadge key={`${doc.id}-status`} status={doc.status} />,
            doc.updatedAt,
          ])}
        />
      </DemoCard>
    </div>
  );
}
