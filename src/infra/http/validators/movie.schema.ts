import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
});

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
