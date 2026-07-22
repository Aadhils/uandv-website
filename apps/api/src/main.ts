import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { configureApp } from './bootstrap/configure-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  configureApp(app);

  const logger = app.get(Logger);
  app.useLogger(logger);

  const port = process.env.API_PORT ?? 3001;
  const host = process.env.API_HOST ?? '0.0.0.0';

  await app.listen(port, host);
  logger.log(`U&V API listening on http://${host}:${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start API:', error);
  process.exit(1);
});
