import { z } from 'zod';

export const seatModel = z.object({
  id: z.string(),
  roomId: z.string(),
  __typename: z.literal('Seat'),
});

export type SeatModel = z.infer<typeof seatModel>;
