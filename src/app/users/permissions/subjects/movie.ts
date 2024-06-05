import { z } from 'zod';

export const movieSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('get'),
  ]),
  z.literal('Movie'),
]);

export type MovieSubject = z.infer<typeof movieSubject>;
