import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';

import { PrismaService } from '../database/database.module';
import { RedisService } from '../redis/redis.module';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'uandv-api',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ready')
  @HealthCheck()
  async getReadiness() {
    return this.health.check([
      async () => {
        await this.prisma.$queryRaw`SELECT 1`;
        return { database: { status: 'up' } };
      },
      async () => {
        await this.redisService.ping();
        return { redis: { status: 'up' } };
      },
    ]);
  }
}
