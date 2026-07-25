import { logAuthEvent } from '@/lib/auth/clerk-sign-in';

export type LoginAuthMode = 'customer' | 'admin';

type SignInAttempt = {
  status: string | null;
};

export type CustomerSignInClient = {
  status: string | null;
  supportedFirstFactors?: Array<{ strategy: string }> | null;
  firstFactorVerification?: {
    status: string | null;
    strategy: string | null;
  } | null;
  create: (params: { identifier: string }) => Promise<SignInAttempt>;
  attemptFirstFactor: (params: {
    strategy: 'password';
    password: string;
  }) => Promise<SignInAttempt>;
};

export function customerSignInNeedsPolicyBypass(
  status: string | null | undefined,
  signIn: CustomerSignInClient,
): boolean {
  if (status === 'needs_second_factor' || status === 'needs_client_trust') {
    return true;
  }

  if (status === 'needs_first_factor') {
    const passwordVerified =
      signIn.firstFactorVerification?.status === 'verified' &&
      signIn.firstFactorVerification?.strategy === 'password';
    const needsExtraCode = signIn.supportedFirstFactors?.some(
      (factor) =>
        factor.strategy === 'email_code' || factor.strategy === 'phone_code',
    );
    return Boolean(passwordVerified && needsExtraCode);
  }

  return false;
}

export async function prepareCustomerSignIn(identifier: string): Promise<void> {
  const response = await fetch('/api/auth/customer/prepare-sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier }),
  });

  if (!response.ok) {
    logAuthEvent('customer-prepare-sign-in:client_failed', {
      status: response.status,
    });
    return;
  }

  const payload = (await response.json()) as { applied?: boolean; reason?: string };
  logAuthEvent('customer-prepare-sign-in:client_ok', {
    applied: payload.applied ?? false,
    reason: payload.reason ?? null,
  });
}

export async function runCustomerPasswordSignIn(
  signIn: CustomerSignInClient,
  identifier: string,
  password: string,
): Promise<SignInAttempt> {
  const attempt = async () => {
    let result = await signIn.create({ identifier });
    if (result.status === 'needs_first_factor') {
      const supportsPassword = signIn.supportedFirstFactors?.some(
        (factor) => factor.strategy === 'password',
      );
      if (supportsPassword) {
        result = await signIn.attemptFirstFactor({
          strategy: 'password',
          password,
        });
      }
    }
    return result;
  };

  let result = await attempt();

  if (customerSignInNeedsPolicyBypass(result.status, signIn)) {
    logAuthEvent('login:customer_policy_bypass', {
      status: result.status,
    });
    await prepareCustomerSignIn(identifier);
    result = await attempt();
  }

  return result;
}
