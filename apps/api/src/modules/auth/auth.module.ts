import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ClerkWebhookController } from './clerk-webhook.controller';
import { AuthService } from './auth.service';
import { ClerkAuthGuard } from './guards/clerk-auth.guard';

@Module({
  controllers: [ClerkWebhookController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
