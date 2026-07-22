import { defineConfig } from 'eslint/config';
import nextConfig from 'eslint-config-next';

export default defineConfig([
  {
    ignores: ['**/dist/**', '**/.next/**', '**/node_modules/**'],
  },
  ...nextConfig,
]);
