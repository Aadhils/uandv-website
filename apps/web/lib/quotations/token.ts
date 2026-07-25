import { randomBytes } from 'node:crypto';

export function generateQuotationPublicToken(): string {
  return randomBytes(32).toString('base64url');
}

export function buildPublicQuotationUrl(publicToken: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uandv.com').replace(
    /\/$/,
    '',
  );
  return `${base}/quotations/q/${publicToken}`;
}
