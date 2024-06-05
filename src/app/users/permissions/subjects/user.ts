import { z } from 'zod';
import { userModel } from '@app/users/permissions/models/user';

export const userSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get'),
    z.literal('change-role'),
  ]),
  z.union([userModel, z.literal('User')]),
]);
