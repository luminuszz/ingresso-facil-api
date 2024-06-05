import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoomDto, createRoomSchema } from './validators/rooms.schema';
import { Validate } from './validators/zod-validation.pipe';
import { CreateRoom } from '@app/room/useCases/create-room';
import { ListSeatsInRoom } from '@app/room/useCases/list-seats-in-room';
import { CreateRoomWithSeats } from '@app/room/useCases/create-room-with-seats';

@Controller('rooms')
export class RoomController {
  constructor(
    private createRoom: CreateRoom,
    private readonly listSeatsInRoom: ListSeatsInRoom,
    private readonly createRoomWithSeats: CreateRoomWithSeats,
  ) {}

  @Post()
  @Validate(createRoomSchema)
  async createRoomPost(@Body() dto: CreateRoomDto) {
    if ('seats' in dto) {
      await this.createRoomWithSeats.execute({
        roomNumber: dto.number,
        type: dto.type,
        seats: dto.seats,
      });
    } else {
      await this.createRoom.execute(dto);
    }
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

  @Put(':roomId')
  async updateRoom(
    @Param('roomId') roomId: string,
    // @Body() dto: CreateRoomDto,
  ) {
    if (!roomId) throw new BadRequestException('Room id is required');
  }
}
