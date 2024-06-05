import { z } from 'zod';
import { UserRole } from '@app/users/user.entity';

export const roles = z.nativeEnum(UserRole);

export type Roles = z.infer<typeof roles>;
