import { z } from 'zod';

export const ticketModel = z.object({
  id: z.string(),
  movieSessionId: z.string(),
  seatId: z.string(),
  ownerTo: z.string(),
  __typename: z.literal('Ticket'),
});

export type TicketModel = z.infer<typeof ticketModel>;
