import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { ROLE_DECORATOR_METADATA_KEY } from './decorators';
import { AuthUserTokenPayload } from '../dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflect: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflect.getAllAndOverride(ROLE_DECORATOR_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const { user } = context
      .switchToHttp()
      .getRequest<{ user: AuthUserTokenPayload }>();

    return this.authService.checkUserRole(user.id, role);
  }
}
