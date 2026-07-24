import {
  isSignupAccountType,
  type SignupAccountType,
} from './roles';

export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Indian-friendly mobile: optional +91 / 0, then 10 digits starting 6–9 */
const MOBILE_PATTERN = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;

export function normalizeMobile(value: string): string {
  return value.replace(/[\s-]/g, '');
}

export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isMobile(value: string): boolean {
  return MOBILE_PATTERN.test(normalizeMobile(value.trim()));
}

/** Email address or mobile number (login / recovery identifier). */
export function isEmailOrMobile(value: string): boolean {
  const trimmed = value.trim();
  return isEmail(trimmed) || isMobile(trimmed);
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Use at least 8 characters.';
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Include at least one letter and one number.';
  }
  return undefined;
}

export type LoginInput = {
  identifier: string;
  password: string;
  rememberMe?: boolean;
};

export function validateLogin(input: LoginInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.identifier.trim()) {
    errors.identifier = 'Enter your email or mobile number.';
  } else if (!isEmailOrMobile(input.identifier)) {
    errors.identifier = 'Enter a valid email or mobile number.';
  }

  if (!input.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export type SignupInput = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  acceptTerms: boolean;
};

export function validateSignup(input: SignupInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (input.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name.';
  }

  if (!input.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isEmail(input.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!input.mobile.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!isMobile(input.mobile)) {
    errors.mobile = 'Enter a valid 10-digit mobile number.';
  }

  const passwordError = validatePassword(input.password);
  if (passwordError) errors.password = passwordError;

  if (!input.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (input.password !== input.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!input.accountType) {
    errors.accountType = 'Select an account type.';
  } else if (!isSignupAccountType(input.accountType)) {
    errors.accountType = 'Choose Customer, Vendor, or Partner.';
  }

  if (!input.acceptTerms) {
    errors.acceptTerms = 'Accept the terms and privacy policy to continue.';
  }

  return errors;
}

export type ForgotPasswordInput = {
  identifier: string;
};

export function validateForgotPassword(
  input: ForgotPasswordInput,
): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.identifier.trim()) {
    errors.identifier = 'Enter your email or mobile number.';
  } else if (!isEmailOrMobile(input.identifier)) {
    errors.identifier = 'Enter a valid email or mobile number.';
  }

  return errors;
}

export type VerifyEmailInput = {
  code: string;
};

export function validateVerifyEmail(input: VerifyEmailInput): FieldErrors {
  const errors: FieldErrors = {};
  const code = input.code.replace(/\D/g, '');

  if (code.length !== 6) {
    errors.code = 'Enter the 6-digit verification code.';
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Safe demo payload — never include password fields. */
export function toSignupDemoPayload(input: SignupInput): {
  fullName: string;
  email: string;
  mobile: string;
  accountType: SignupAccountType | string;
} {
  return {
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    mobile: normalizeMobile(input.mobile.trim()),
    accountType: input.accountType,
  };
}
