import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { AuthUserTokenPayload } from './dto';
import { UserRole } from '@app/users/user.entity';

export const User = createParamDecorator(
  (keyData: keyof AuthUserTokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: AuthUserTokenPayload }>();

    return keyData ? request.user[keyData] : request.user;
  },
);

export const IS_PUBLIC_METADATA_KEY = 'isPublic';

export const IsPublic = () => SetMetadata(IS_PUBLIC_METADATA_KEY, true);

export const ROLE_DECORATOR_METADATA_KEY = 'roles';

export const ProtectedFor = (role: keyof typeof UserRole) =>
  SetMetadata(ROLE_DECORATOR_METADATA_KEY, role);
