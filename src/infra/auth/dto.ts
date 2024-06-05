import { UserRole } from '@app/users/user.entity';

export interface AuthUserTokenPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  __typename: 'User';
}
