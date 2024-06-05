import { z } from 'zod';
import { seatModel } from '@app/users/permissions/models/seat';

export const seatSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get'),
  ]),
  z.union([seatModel, z.literal('Seat')]),
]);
