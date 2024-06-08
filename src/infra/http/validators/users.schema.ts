import { z } from 'zod';
import { UserRole } from '@app/users/user.entity';

export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

export type UpdateUserRoleDto = z.infer<typeof updateUserRoleSchema>;
