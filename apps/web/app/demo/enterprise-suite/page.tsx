'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SUITE_MODULE_INTENT_KEY } from '@/lib/demo/enterprise-suite/types';

export default function SuiteIndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get('module') === 'travel') {
      window.sessionStorage.setItem(SUITE_MODULE_INTENT_KEY, 'travel');
    }
    router.replace('/demo/enterprise-suite/login');
  }, [router, searchParams]);
  return <div className="flex min-h-svh items-center justify-center text-sm text-uv-foreground-muted">Opening demo…</div>;
}
