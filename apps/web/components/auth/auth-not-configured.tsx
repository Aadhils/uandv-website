import Link from 'next/link';

export function AuthNotConfigured() {
  return (
    <div className="space-y-3 rounded-uv-lg border border-uv-warning/30 bg-uv-warning-muted/40 px-4 py-4 text-sm text-uv-foreground">
      <p className="font-medium">Clerk authentication is not configured.</p>
      <p className="text-uv-foreground-muted">
        Set <code className="text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{' '}
        <code className="text-xs">CLERK_SECRET_KEY</code> in your environment, then
        restart the app.
      </p>
      <p>
        <Link href="/contact" className="font-medium text-uv-brand underline-offset-4 hover:underline">
          Contact U&V
        </Link>{' '}
        if you need help getting started.
      </p>
    </div>
  );
}
