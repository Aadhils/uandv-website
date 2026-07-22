import {
  Global,
  Injectable,
  Module,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { ApiEnv } from '../../config/env.validation';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly client: Redis) {}

  getClient(): Redis {
    return this.client;
  }

  async onModuleInit(): Promise<void> {
    if (this.client.status === 'wait') {
      await this.client.connect();
    }
  }

  async ping(): Promise<string> {
    const result = await this.client.ping();
    if (result !== 'PONG') {
      throw new ServiceUnavailableException('Redis ping failed');
    }
    return result;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client.status !== 'end') {
      await this.client.quit();
    }
  }
}

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ApiEnv, true>) => {
        const redisUrl = configService.get('REDIS_URL', { infer: true });
        return new Redis(redisUrl, {
          maxRetriesPerRequest: 3,
          lazyConnect: true,
        });
      },
    },
    {
      provide: RedisService,
      inject: [REDIS_CLIENT],
      useFactory: (client: Redis) => new RedisService(client),
    },
  ],
  exports: [RedisService, REDIS_CLIENT],
})
export class RedisModule {}
