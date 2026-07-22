import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      requestId?: string;
    }>();
    const response = context.switchToHttp().getResponse<{
      setHeader: (key: string, value: string) => void;
    }>();

    const incoming =
      typeof request.headers['x-request-id'] === 'string'
        ? request.headers['x-request-id']
        : undefined;

    const requestId = incoming ?? randomUUID();
    request.requestId = requestId;
    response.setHeader('X-Request-Id', requestId);

    return next.handle();
  }
}
