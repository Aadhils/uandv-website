/**
 * Clerk sign-in helpers — safe user messages and auth event logging.
 * Never log passwords, OTP codes, or full identifiers.
 */

export type ClerkErrorShape = {
  code?: string;
  message?: string;
  longMessage?: string;
};

export type SignInFlowStatus =
  | 'complete'
  | 'needs_first_factor'
  | 'needs_second_factor'
  | 'needs_new_password'
  | 'needs_identifier'
  | 'needs_client_trust'
  | 'unknown';

export function getClerkErrors(error: unknown): ClerkErrorShape[] {
  if (
    error &&
    typeof error === 'object' &&
    'errors' in error &&
    Array.isArray((error as { errors?: ClerkErrorShape[] }).errors)
  ) {
    return (error as { errors: ClerkErrorShape[] }).errors;
  }
  return [];
}

export function getClerkErrorCodes(error: unknown): string[] {
  return getClerkErrors(error)
    .map((item) => item.code?.toLowerCase() ?? '')
    .filter(Boolean);
}

export function maskIdentifier(identifier: string): string {
  const trimmed = identifier.trim();
  if (!trimmed) return '';
  if (trimmed.includes('@')) {
    const [local, domain] = trimmed.split('@');
    if (!domain) return '***';
    const head = local.slice(0, 2);
    return `${head}***@${domain}`;
  }
  if (trimmed.length <= 4) return '***';
  return `***${trimmed.slice(-4)}`;
}

/** User-safe sign-in error — no raw Clerk messages. */
export function mapClerkSignInError(error: unknown): string {
  const codes = getClerkErrorCodes(error);

  if (
    codes.some(
      (code) =>
        code.includes('session_exists') || code.includes('session_already'),
    )
  ) {
    return '';
  }

  if (
    codes.some(
      (code) =>
        code === 'form_password_incorrect' ||
        code === 'form_password_validation_failed',
    )
  ) {
    return 'Incorrect email or password.';
  }

  if (
    codes.some(
      (code) =>
        code === 'form_identifier_not_found' ||
        code === 'identifier_not_found' ||
        code === 'form_param_format_invalid',
    )
  ) {
    return 'We could not find an account with those details. Check your email or create an account.';
  }

  if (
    codes.some(
      (code) =>
        code === 'form_code_incorrect' ||
        code === 'verification_failed' ||
        code === 'form_param_nil',
    )
  ) {
    return 'Invalid verification code. Please try again.';
  }

  if (codes.some((code) => code.includes('user_locked') || code.includes('locked'))) {
    return 'Your account is temporarily locked. Try again later or reset your password.';
  }

  if (codes.some((code) => code.includes('too_many') || code.includes('rate_limit'))) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  return 'Unable to sign in. Please check your details and try again.';
}

export function isSessionAlreadyExistsError(error: unknown): boolean {
  const codes = getClerkErrorCodes(error);
  if (
    codes.some(
      (code) =>
        code.includes('session_exists') || code.includes('session_already'),
    )
  ) {
    return true;
  }
  return mapClerkSignInError(error) === '';
}

export function logAuthEvent(
  event: string,
  detail: Record<string, unknown> = {},
): void {
  if (process.env.NODE_ENV === 'production') {
    console.info(`[uv-auth] ${event}`, detail);
  } else {
    console.log(`[uv-auth] ${event}`, detail);
  }
}

export function normalizeSignInStatus(status: string | null | undefined): SignInFlowStatus {
  switch (status) {
    case 'complete':
    case 'needs_first_factor':
    case 'needs_second_factor':
    case 'needs_new_password':
    case 'needs_identifier':
    case 'needs_client_trust':
      return status;
    default:
      return 'unknown';
  }
}
