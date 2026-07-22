import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ApiErrorResponse } from '@uandv/shared';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { requestId?: string }>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let details: unknown;
    let error = HttpStatus[status] ?? 'Error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const payload = exceptionResponse as {
        message?: string | string[];
        error?: string;
        details?: unknown;
      };
      message = Array.isArray(payload.message)
        ? payload.message.join(', ')
        : (payload.message ?? message);
      error = payload.error ?? error;
      details = payload.details;
    } else if (exception instanceof Error) {
      message =
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : exception.message;
    }

    if (status >= 500) {
      this.logger.error(
        {
          requestId: request.requestId,
          path: request.url,
          err: exception instanceof Error ? exception.stack : exception,
        },
        message,
      );
    }

    const body: ApiErrorResponse = {
      statusCode: status,
      error,
      message,
      details,
      requestId: request.requestId,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(body);
  }
}
