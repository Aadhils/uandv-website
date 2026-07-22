'use client';

import dynamic from 'next/dynamic';

const AuthControlsClerk = dynamic(
  () =>
    import('./auth-controls-clerk').then((module) => module.AuthControlsClerk),
  { ssr: false },
);

const AuthCallToActionClerk = dynamic(
  () =>
    import('./auth-controls-clerk').then(
      (module) => module.AuthCallToActionClerk,
    ),
  { ssr: false },
);

export function AuthControls() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    return null;
  }

  return <AuthControlsClerk />;
}

export function AuthCallToAction() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    return (
      <p className="mt-10 text-sm text-gray-500">
        Configure Clerk keys in `.env` to enable authentication.
      </p>
    );
  }

  return <AuthCallToActionClerk />;
}
