'use client';

import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import * as React from 'react';

import { Button, Form, FormField, Input } from '@uandv/ui';

import { ClerkGate } from '@/components/auth/clerk-gate';
import { PasswordField } from '@/components/auth/password-field';

export function ForgotPasswordForm() {
  return (
    <ClerkGate>
      <ClerkForgotPasswordForm />
    </ClerkGate>
  );
}

function ClerkForgotPasswordForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [step, setStep] = React.useState<'request' | 'reset'>('request');
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!isLoaded || !signIn) {
      setError('Authentication is not configured.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email.trim(),
      });
      setStep('reset');
      setMessage('We sent a reset code to your email.');
    } catch {
      setError('Unable to start password reset. Check the email and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const onReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!isLoaded || !signIn) return;
    setSubmitting(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: code.trim(),
        password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setMessage('Password updated. You are signed in.');
        return;
      }
      setError('Could not complete password reset.');
    } catch {
      setError('Invalid code or password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'reset') {
    return (
      <Form spacing="md" onSubmit={onReset} noValidate>
        {message ? (
          <p className="text-sm text-uv-foreground-muted">{message}</p>
        ) : null}
        <FormField label="Reset code" htmlFor="reset-code" required>
          <Input
            id="reset-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={submitting}
          />
        </FormField>
        <PasswordField
          name="password"
          id="reset-password"
          label="New password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
        />
        {error ? (
          <p className="text-sm text-uv-error" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Updating…' : 'Update password'}
        </Button>
        <p className="text-sm text-uv-foreground-muted">
          <Link href="/login" className="text-uv-brand underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </Form>
    );
  }

  return (
    <Form spacing="md" onSubmit={onRequest} noValidate>
      <p className="text-sm text-uv-foreground-muted">
        Enter the email on your account. Clerk will send a one-time reset code.
      </p>
      <FormField label="Email" htmlFor="forgot-email" required>
        <Input
          id="forgot-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
      </FormField>
      {error ? (
        <p className="text-sm text-uv-error" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send reset code'}
      </Button>
    </Form>
  );
}
