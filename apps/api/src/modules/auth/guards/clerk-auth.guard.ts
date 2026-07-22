import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { ADMIN_ROLES } from '@uandv/shared';

import { IS_PUBLIC_KEY } from '../../../common/decorators/public.decorator';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';
import { AuthService } from '../auth.service';

export type AuthenticatedRequest = Request & {
  requestId?: string;
  user?: {
    clerkId: string;
    userId: string;
    email: string;
    role: string;
  };
};

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.slice('Bearer '.length);

    try {
      const payload = await this.authService.verifyClerkToken(token);
      const clerkId = payload.sub;

      if (!clerkId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const user = await this.authService.findActiveUserByClerkId(clerkId);
      if (!user) {
        throw new UnauthorizedException('User not found or deactivated');
      }

      request.user = {
        clerkId: user.clerkId,
        userId: user.id,
        email: user.email,
        role: user.role,
      };

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (requiredRoles?.length && !requiredRoles.includes(user.role)) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

export { ADMIN_ROLES };
