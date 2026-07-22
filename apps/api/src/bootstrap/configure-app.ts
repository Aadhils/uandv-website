import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { API_PREFIX } from '@uandv/shared';

import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { setupSwagger } from './setup-swagger';
import { ApiEnv } from '../config/env.validation';

export function configureApp(app: INestApplication): void {
  const configService = app.get(ConfigService<ApiEnv, true>);
  const corsOrigins = configService.get('CORS_ORIGINS', { infer: true });
  const nodeEnv = configService.get('NODE_ENV', { infer: true });

  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === 'production',
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Request-Id',
      'Idempotency-Key',
    ],
  });

  app.setGlobalPrefix(API_PREFIX, {
    exclude: ['health', 'ready', 'webhooks/clerk'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  if (nodeEnv !== 'production') {
    setupSwagger(app);
  }
}
