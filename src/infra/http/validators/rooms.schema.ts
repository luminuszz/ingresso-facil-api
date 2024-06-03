import { z } from 'zod';
import { RoomType } from '@app/room/room.entity';

export const createRoomSchema = z.object({
  number: z
    .number()
    .int()
    .positive()
    .refine((value) => value !== 0),
  type: z.nativeEnum(RoomType),
});

export type CreateRoomDto = z.infer<typeof createRoomSchema>;
