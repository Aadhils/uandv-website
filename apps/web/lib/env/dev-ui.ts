/**
 * Dev-only UI labels (e.g. "Demo data" badges). Hidden in production builds.
 */
export function showDevUILabels(): boolean {
  return process.env.NODE_ENV === 'development';
}
