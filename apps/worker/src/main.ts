import Redis from 'ioredis';
import pino from 'pino';

import { parseEnv, workerEnvSchema } from '@uandv/shared';

const env = parseEnv(workerEnvSchema);
const logger = pino({ level: env.LOG_LEVEL });

async function bootstrap() {
  const redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });

  redis.on('connect', () => {
    logger.info('Worker connected to Redis');
  });

  redis.on('error', (error) => {
    logger.error({ err: error }, 'Redis connection error');
  });

  await redis.ping();
  logger.info(
    { nodeEnv: env.NODE_ENV },
    'U&V worker foundation ready — job processors will be added in Phase 1+',
  );

  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutting down worker');
    await redis.quit();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

bootstrap().catch((error: unknown) => {
  logger.error({ err: error }, 'Worker failed to start');
  process.exit(1);
});
