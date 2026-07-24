'use client';

import { ClerkProvider } from '@clerk/nextjs';

export function AuthProvider({
  children,
  publishableKey,
}: {
  children: React.ReactNode;
  publishableKey?: string;
}) {
  const key =
    publishableKey?.trim() ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

  if (!key) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={key}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/login'}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/signup'}
      signInFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard'
      }
      signUpFallbackRedirectUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard'
      }
    >
      {children}
    </ClerkProvider>
  );
}
