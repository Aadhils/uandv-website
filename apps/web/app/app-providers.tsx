'use client';

import { ThemeProvider } from '@uandv/ui';

import { AuthProvider } from './providers';

export function AppProviders({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode;
  clerkPublishableKey?: string;
}) {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider publishableKey={clerkPublishableKey}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
