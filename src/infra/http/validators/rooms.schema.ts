import { z } from 'zod';
import { RoomType } from '@app/room/room.entity';

const positiveNumber = z
  .number()
  .int()
  .positive()
  .refine((value) => value !== 0);

export const createRoomSchemaWithoutSeats = z.object({
  number: positiveNumber,
  type: z.nativeEnum(RoomType),
});

export const createRoomWithSeatsSchema = createRoomSchemaWithoutSeats.merge(
  z.object({
    seats: z
      .array(
        z.object({
          seatNumber: positiveNumber,
        }),
      )
      .min(1),
  }),
);

export const createRoomSchema = createRoomWithSeatsSchema.or(
  createRoomSchemaWithoutSeats,
);

export type CreateRoomDto = z.infer<typeof createRoomSchema>;
