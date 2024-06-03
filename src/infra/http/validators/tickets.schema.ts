import { z } from 'zod';

export const createTicketSchema = z.object({
  userId: z.string().cuid(),
  movieSessionId: z.string().cuid(),
  seatId: z.string().cuid(),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
