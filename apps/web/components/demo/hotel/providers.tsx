'use client';

import type { ReactNode } from 'react';

import { HotelDemoAuthProvider } from '@/lib/demo/hotel/auth-context';
import { HotelDemoStoreProvider } from '@/lib/demo/hotel/store-context';

import { HotelDemoGate } from './gate';

export function HotelDemoProviders({ children }: { children: ReactNode }) {
  return (
    <HotelDemoAuthProvider>
      <HotelDemoStoreProvider>
        <HotelDemoGate>{children}</HotelDemoGate>
      </HotelDemoStoreProvider>
    </HotelDemoAuthProvider>
  );
}
