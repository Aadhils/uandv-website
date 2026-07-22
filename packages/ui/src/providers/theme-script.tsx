/**
 * Inline script to apply stored/system theme before paint (prevents FOUC).
 * Place inside <html> or as the first child of <head>/<body>.
 */
export function ThemeScript({ storageKey = 'uandv-theme' }: { storageKey?: string }) {
  const script = `
(function() {
  try {
    var key = ${JSON.stringify(storageKey)};
    var stored = localStorage.getItem(key);
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    var resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  } catch (e) {}
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
