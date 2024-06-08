import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_METADATA_KEY } from './decorators';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  private extractJwtToken(request: FastifyRequest) {
    const headerToken = request.headers['authorization'] as string;

    if (!headerToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = headerToken.split(' ')[1];

    return {
      token,
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_METADATA_KEY,
        [context.getClass(), context.getHandler()],
      );

      if (isPublic) {
        return true;
      }
      const request = context.switchToHttp().getRequest<FastifyRequest>();

      const { token } = this.extractJwtToken(request);

      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = payload;

      return !!payload;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
