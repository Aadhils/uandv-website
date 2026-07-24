'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { Button, Form, FormField, Input } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';

type ProfileState = {
  fullName: string;
  mobile: string;
  companyName: string;
  city: string;
  state: string;
  businessType: string;
};

export function LiveCustomerProfilePage() {
  const [form, setForm] = useState<ProfileState>({
    fullName: '',
    mobile: '',
    companyName: '',
    city: '',
    state: '',
    businessType: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/me/profile');
        if (!res.ok) throw new Error('Failed to load profile');
        const data = (await res.json()) as {
          user: { fullName: string; mobile?: string };
          profile: {
            companyName: string;
            city: string;
            state: string;
            businessType: string;
          };
        };
        if (cancelled) return;
        setForm({
          fullName: data.user.fullName || '',
          mobile: data.user.mobile || '',
          companyName: data.profile.companyName || '',
          city: data.profile.city || '',
          state: data.profile.state || '',
          businessType: data.profile.businessType || '',
        });
      } catch {
        if (!cancelled) setError('Unable to load your profile.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/me/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        setError(data?.error || 'Could not save profile.');
        return;
      }
      setMessage('Profile saved.');
    } catch {
      setError('Network error while saving profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <CustomerPageHeader
        title="Your profile"
        description="Update the details our team uses when following up on your enquiries."
      />

      {loading ? (
        <p className="text-sm text-uv-foreground-muted">Loading profile…</p>
      ) : (
        <Form onSubmit={onSubmit} className="rounded-uv-2xl border border-uv-border bg-uv-background p-5 sm:p-6">
          <FormField label="Full name" required>
            <Input
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
              disabled={saving}
              required
            />
          </FormField>
          <FormField label="Mobile">
            <Input
              value={form.mobile}
              onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
              disabled={saving}
            />
          </FormField>
          <FormField label="Company name">
            <Input
              value={form.companyName}
              onChange={(e) =>
                setForm((f) => ({ ...f, companyName: e.target.value }))
              }
              disabled={saving}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="City">
              <Input
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                disabled={saving}
              />
            </FormField>
            <FormField label="State">
              <Input
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                disabled={saving}
              />
            </FormField>
          </div>
          <FormField label="Business type">
            <Input
              value={form.businessType}
              onChange={(e) =>
                setForm((f) => ({ ...f, businessType: e.target.value }))
              }
              disabled={saving}
              placeholder="e.g. Retail, Services, Manufacturing"
            />
          </FormField>

          {error ? (
            <p className="text-sm text-uv-error" role="alert">
              {error}
            </p>
          ) : null}
          {message ? (
            <p className="text-sm text-uv-brand" role="status">
              {message}
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save profile'}
          </Button>
        </Form>
      )}
    </div>
  );
}
