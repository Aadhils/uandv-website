'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { buttonVariants, cn } from '@uandv/ui';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

type ClerkSignOutButtonProps = {
  className?: string;
  label?: string;
  redirectUrl?: string;
  fullWidth?: boolean;
};

function SignOutButtonInner({
  className,
  label = 'Sign out',
  redirectUrl = '/login',
  fullWidth = false,
}: ClerkSignOutButtonProps) {
  const router = useRouter();
  const { signOut, loaded } = useClerk();

  const handleSignOut = async () => {
    try {
      sessionStorage.removeItem('uv_auth_login_redirect_ts');
    } catch {
      // ignore
    }

    if (!loaded) return;

    await signOut({ redirectUrl });
  };

  return (
    <button
      type="button"
      onClick={() => void handleSignOut()}
      disabled={!loaded}
      className={cn(
        buttonVariants({ size: 'sm', variant: 'ghost' }),
        fullWidth && 'w-full justify-start',
        className,
      )}
    >
      {label}
    </button>
  );
}

export function ClerkSignOutButton(props: ClerkSignOutButtonProps) {
  const router = useRouter();

  if (!hasClerk) {
    return (
      <button
        type="button"
        onClick={() => router.replace(props.redirectUrl ?? '/login')}
        className={cn(
          buttonVariants({ size: 'sm', variant: 'ghost' }),
          props.fullWidth && 'w-full justify-start',
          props.className,
        )}
      >
        {props.label ?? 'Sign out'}
      </button>
    );
  }

  return <SignOutButtonInner {...props} />;
}
