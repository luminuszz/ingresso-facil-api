import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

import { UserAlreadyExists } from '@app/users/exceptions';
import { ResourceNotFoundException } from '@core/errors';

interface PrismaError {
  code: string;
  name: string;
}

export const isPrismaNotFoundEntityError = (error: any): error is PrismaError =>
  error.code !== undefined && error.code == 'P2025' && error.name !== undefined;

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      catchError((exception) => {
        if (exception instanceof UserAlreadyExists) {
          throw new BadRequestException(exception.message);
        }

        if (exception instanceof ResourceNotFoundException) {
          throw new BadRequestException(exception.message);
        }

        if (isPrismaNotFoundEntityError(exception)) {
          throw new BadRequestException({
            message: `Not found Entity`,
          });
        }

        throw exception;
      }),
    );
  }
}
