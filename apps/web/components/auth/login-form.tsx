'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import {
  Button,
  Checkbox,
  Form,
  FormField,
  Input,
} from '@uandv/ui';

import { PasswordField } from '@/components/auth/password-field';
import {
  DEMO_ADMIN_IDENTITY,
  DEMO_CUSTOMER_IDENTITY,
  DEMO_EMPLOYEE_IDENTITY,
  WORKSPACE_ROLES,
  hasFieldErrors,
  setDemoAuthPreview,
  setDemoWorkspaceSession,
  validateLogin,
  workspaceHomeForRole,
  type FieldErrors,
  type WorkspaceRole,
} from '@/lib/auth';

export type LoginFormProps = {
  /** Target workspace role for dedicated entry routes. */
  intendedRole?: WorkspaceRole;
  /** Optional override; defaults from intendedRole / customer home. */
  redirectTo?: string;
};

function identityForRole(role: WorkspaceRole) {
  if (role === WORKSPACE_ROLES.ADMIN) return DEMO_ADMIN_IDENTITY;
  if (role === WORKSPACE_ROLES.EMPLOYEE) return DEMO_EMPLOYEE_IDENTITY;
  return DEMO_CUSTOMER_IDENTITY;
}

export function LoginForm({
  intendedRole = WORKSPACE_ROLES.CUSTOMER,
  redirectTo,
}: LoginFormProps) {
  const router = useRouter();
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const destination =
    redirectTo ?? workspaceHomeForRole(intendedRole);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const identifier = String(data.get('identifier') ?? '');
    const password = String(data.get('password') ?? '');
    const rememberMe = data.get('rememberMe') === 'on';

    const nextErrors = validateLogin({ identifier, password, rememberMe });
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) return;

    // Demo only — password is never stored or logged.
    // Same shared identity engine for Customer, Admin, and Employee.
    const identity = identityForRole(intendedRole);
    setSubmitting(true);
    setDemoAuthPreview(true);
    setDemoWorkspaceSession({
      userId: identity.userId,
      activeRole: intendedRole,
    });
    window.setTimeout(() => {
      router.push(destination);
    }, 200);
  };

  return (
    <Form spacing="md" onSubmit={onSubmit} noValidate>
      <FormField
        label="Email or mobile number"
        htmlFor="login-identifier"
        required
        error={errors.identifier}
      >
        <Input
          name="identifier"
          id="login-identifier"
          type="text"
          autoComplete="username"
          inputMode="email"
          placeholder="you@example.com or mobile"
        />
      </FormField>

      <PasswordField
        label="Password"
        name="password"
        id="login-password"
        required
        autoComplete="current-password"
        error={errors.password}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Checkbox
          name="rememberMe"
          id="login-remember"
          label="Remember me"
        />
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth isLoading={submitting}>
        Sign in
      </Button>

      {intendedRole === WORKSPACE_ROLES.CUSTOMER ? (
        <p className="text-center text-sm text-uv-foreground-muted">
          New to U&V?{' '}
          <Link
            href="/signup"
            className="font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-uv-foreground-muted">
          Internal access uses the same identity engine as customers — not a
          separate credential database.
        </p>
      )}

      <p className="text-center text-xs text-uv-foreground-subtle">
        Successful demo submission opens{' '}
        <span className="font-medium text-uv-foreground">{destination}</span>.
      </p>
    </Form>
  );
}
