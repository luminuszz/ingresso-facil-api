import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(500),
  userId: z.string().cuid(),
  movieId: z.string().cuid(),
  room: z.number().int().positive(),
  seat: z.number().int().positive(),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
