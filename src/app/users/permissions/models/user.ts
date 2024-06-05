import { z } from 'zod';
import { UserRole } from '@app/users/user.entity';

export const userModel = z.object({
  id: z.string(),
  email: z.string(),
  role: z.nativeEnum(UserRole),
  __typename: z.literal('User'),
});

export type UserModel = z.infer<typeof userModel>;
