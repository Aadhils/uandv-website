import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PartnerPublicProfilePage } from '@/components/partners';

type PageProps = {
  params: Promise<{ partnerId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { partnerId } = await params;
  return {
    title: `Partner · ${partnerId}`,
    description: 'U&V Partner Marketplace public profile. Demo data only.',
  };
}

export default async function PartnerPublicProfileRoute({ params }: PageProps) {
  const { partnerId } = await params;
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-uv-foreground-muted">
          Loading partner profile…
        </div>
      }
    >
      <PartnerPublicProfilePage partnerId={partnerId} />
    </Suspense>
  );
}
