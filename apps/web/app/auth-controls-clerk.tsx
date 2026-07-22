'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export function AuthControlsClerk() {
  return (
    <header className="absolute top-0 right-0 p-6">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-purple-700 font-medium hover:text-purple-800">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}

export function AuthCallToActionClerk() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="mt-10 bg-purple-700 text-white px-8 py-4 rounded-xl hover:bg-purple-800 transition">
            Get Started
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <p className="mt-10 text-lg text-purple-600 font-medium">
          You are signed in. Dashboard coming in Phase 1.
        </p>
      </SignedIn>
    </>
  );
}
