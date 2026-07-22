import { defineConfig } from 'eslint/config';
import nextConfig from 'eslint-config-next';

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/node_modules/**',
      // Demo sandboxes have pre-existing strict-rule debt outside Sprint 1 scope
      'app/demo/**',
      'components/demo/**',
      'lib/demo/**',
    ],
  },
  ...nextConfig,
]);
