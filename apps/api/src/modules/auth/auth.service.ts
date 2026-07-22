import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyToken } from '@clerk/backend';
import { Prisma, User } from '@uandv/database';

import { PrismaService } from '../database/database.module';
import { ApiEnv } from '../../config/env.validation';
import {
  ClerkUserData,
  ClerkWebhookUserPayload,
  extractPrimaryEmail,
  mapClerkRole,
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<ApiEnv, true>,
  ) {}

  async syncUserFromWebhook(payload: ClerkWebhookUserPayload): Promise<User> {
    const email = extractPrimaryEmail(payload);
    if (!email) {
      throw new Error('Clerk user payload missing primary email');
    }

    const data: ClerkUserData = {
      clerkId: payload.id,
      email,
      firstName: payload.first_name,
      lastName: payload.last_name,
      avatarUrl: payload.image_url,
      role: mapClerkRole(payload.public_metadata),
    };

    return this.upsertUser(data);
  }

  async upsertUser(data: ClerkUserData): Promise<User> {
    return this.prisma.user.upsert({
      where: { clerkId: data.clerkId },
      create: {
        clerkId: data.clerkId,
        email: data.email,
        firstName: data.firstName ?? undefined,
        lastName: data.lastName ?? undefined,
        avatarUrl: data.avatarUrl ?? undefined,
        role: data.role,
      },
      update: {
        email: data.email,
        firstName: data.firstName ?? undefined,
        lastName: data.lastName ?? undefined,
        avatarUrl: data.avatarUrl ?? undefined,
        role: data.role,
        deletedAt: null,
      },
    });
  }

  async softDeleteUser(clerkId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      return null;
    }

    return this.prisma.user.update({
      where: { clerkId },
      data: { deletedAt: new Date() },
    });
  }

  async findActiveUserByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { clerkId, deletedAt: null },
    });
  }

  async writeAuditLog(input: {
    userId?: string;
    clerkId?: string;
    action: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    await this.prisma.authAuditLog.create({
      data: {
        userId: input.userId,
        clerkId: input.clerkId,
        action: input.action,
        metadata: input.metadata as Prisma.InputJsonValue | undefined,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });
  }

  async verifyClerkToken(token: string) {
    return verifyToken(token, {
      secretKey: this.configService.get('CLERK_SECRET_KEY', { infer: true }),
    });
  }
}
