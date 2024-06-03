import { z } from 'zod';
import { addHours, isAfter } from 'date-fns';

export const createMovieSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;

export const createMovieSessionSchema = z
  .object({
    movieId: z.string(),
    roomId: z.string(),
    startsAt: z.coerce.date().min(new Date()),
    endsAt: z.coerce.date().min(addHours(new Date(), 2)),
    price: z.number().int().positive(),
  })
  .refine((data) => isAfter(data.endsAt, data.startsAt), {
    path: ['endsAt'],
    message: 'Ends at must be after starts at',
  });

export type CreateMovieSessionDto = z.infer<typeof createMovieSessionSchema>;
