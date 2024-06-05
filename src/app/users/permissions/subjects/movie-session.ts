import { z } from 'zod';

export const movieSessionSubject = z.tuple([
  z.union([z.literal('create'), z.literal('update'), z.literal('get')]),
  z.literal('MovieSession'),
]);

export type MovieSessionSubject = z.infer<typeof movieSessionSubject>;
