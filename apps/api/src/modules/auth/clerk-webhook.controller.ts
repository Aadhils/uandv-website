import {
  BadRequestException,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request } from 'express';
import { Webhook } from 'svix';

import { Public } from '../../common/decorators/public.decorator';
import { ApiEnv } from '../../config/env.validation';
import { AuthService } from './auth.service';
import { ClerkWebhookUserPayload } from './auth.types';

@ApiExcludeController()
@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<ApiEnv, true>,
  ) {}

  @Public()
  @Post()
  async handleWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ) {
    const rawBody = request.rawBody;
    if (!rawBody) {
      throw new BadRequestException('Missing raw request body');
    }

    const webhookSecret = this.configService.get('CLERK_WEBHOOK_SECRET', {
      infer: true,
    });

    const webhook = new Webhook(webhookSecret);
    let event: {
      type: string;
      data: ClerkWebhookUserPayload;
    };

    try {
      event = webhook.verify(rawBody, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as typeof event;
    } catch {
      throw new BadRequestException('Invalid webhook signature');
    }

    switch (event.type) {
      case 'user.created':
      case 'user.updated': {
        const user = await this.authService.syncUserFromWebhook(event.data);
        await this.authService.writeAuditLog({
          userId: user.id,
          clerkId: user.clerkId,
          action: event.type,
          metadata: { source: 'clerk-webhook' },
        });
        break;
      }
      case 'user.deleted': {
        const user = await this.authService.softDeleteUser(event.data.id);
        await this.authService.writeAuditLog({
          userId: user?.id,
          clerkId: event.data.id,
          action: event.type,
          metadata: { source: 'clerk-webhook' },
        });
        break;
      }
      default:
        break;
    }

    return { received: true };
  }
}
