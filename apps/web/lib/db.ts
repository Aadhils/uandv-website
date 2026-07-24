import { prisma } from '@uandv/database';

/**
 * Shared Prisma client for Next.js server routes.
 * Re-exports the workspace singleton (dev hot-reload safe).
 */
export { prisma };
