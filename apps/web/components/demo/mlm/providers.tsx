'use client';

import type { ReactNode } from 'react';

import { MlmDemoAuthProvider } from '@/lib/demo/mlm/auth-context';

import { MlmDemoGate } from './gate';

export function MlmDemoProviders({ children }: { children: ReactNode }) {
  return (
    <MlmDemoAuthProvider>
      <MlmDemoGate>{children}</MlmDemoGate>
    </MlmDemoAuthProvider>
  );
}
