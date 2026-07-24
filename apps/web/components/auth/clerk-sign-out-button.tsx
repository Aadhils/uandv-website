'use client';

import { SignOutButton } from '@clerk/nextjs';

import { buttonVariants, cn } from '@uandv/ui';

type ClerkSignOutButtonProps = {
  className?: string;
  label?: string;
};

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function ClerkSignOutButton({
  className,
  label = 'Sign out',
}: ClerkSignOutButtonProps) {
  if (!hasClerk) {
    return (
      <a
        href="/login"
        className={cn(
          buttonVariants({ size: 'sm', variant: 'ghost' }),
          className,
        )}
      >
        {label}
      </a>
    );
  }

  return (
    <SignOutButton>
      <button
        type="button"
        className={cn(
          buttonVariants({ size: 'sm', variant: 'ghost' }),
          className,
        )}
      >
        {label}
      </button>
    </SignOutButton>
  );
}
