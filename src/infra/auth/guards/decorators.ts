import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { AuthUserTokenPayload } from '../dto';
import { UserRole } from '@app/users/user.entity';

export const IS_PUBLIC_METADATA_KEY = 'isPublic';
export const ROLE_DECORATOR_METADATA_KEY = 'roles';

export const User = createParamDecorator(
  (keyData: keyof AuthUserTokenPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user: AuthUserTokenPayload }>();

    return keyData ? request.user[keyData] : request.user;
  },
);

export const IsPublic = () => {
  return SetMetadata(IS_PUBLIC_METADATA_KEY, true);
};

export const ProtectedFor = (role: keyof typeof UserRole) => {
  return SetMetadata(ROLE_DECORATOR_METADATA_KEY, role);
};
