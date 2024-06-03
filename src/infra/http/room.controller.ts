import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRoomDto, createRoomSchema } from './validators/rooms.schema';
import { Validate } from './validators/zod-validation.pipe';
import { CreateRoom } from '@app/room/useCases/create-room';
import { ListSeatsInRoom } from '@app/room/useCases/list-seats-in-room';

@Controller('rooms')
export class RoomController {
  constructor(
    private createRoom: CreateRoom,
    private readonly listSeatsInRoom: ListSeatsInRoom,
  ) {}

  @Post()
  @Validate(createRoomSchema)
  async createRoomPost(@Body() dto: CreateRoomDto) {
    await this.createRoom.execute(dto);
  }

  @Get(':roomId/list-seats')
  async listSeats(@Param('roomId') roomId: string) {
    if (!roomId) throw new BadRequestException('Room id is required');

    const results = await this.listSeatsInRoom.execute({ roomId });

    return results.seats.map((seat) => ({
      number: seat.number,
      id: seat.id,
      roomId: seat.roomId,
    }));
  }
}
