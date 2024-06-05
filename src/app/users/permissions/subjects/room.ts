import { z } from 'zod';

export const roomSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get'),
  ]),

  z.literal('Room'),
]);

export type RoomSubject = z.infer<typeof roomSubject>;
