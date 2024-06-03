import { z } from 'zod';

export const createTicketSchema = z.object({
  userId: z.string(),
  movieSessionId: z.string(),
  seatId: z.string(),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
