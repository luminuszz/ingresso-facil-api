import { Injectable } from '@nestjs/common';
import { RoomEntity, RoomType } from '@app/room/room.entity';
import { UseCaseImpl } from '@core/use-case-impl';
import { RoomRepository } from '@app/room/room-repository';

interface CreateRoomWithSeatsDto {
  roomNumber: number;
  type: RoomType;

  seats: Array<{
    seatNumber: number;
  }>;
}

@Injectable()
export class CreateRoomWithSeats
  implements UseCaseImpl<CreateRoomWithSeatsDto, { room: RoomEntity }>
{
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute({
    roomNumber,
    seats,
    type,
  }: CreateRoomWithSeatsDto): Promise<{ room: RoomEntity }> {
    const room = RoomEntity.create({
      createdAt: new Date(),
      number: roomNumber,
      type,
      updatedAt: null,
    });

    await this.roomRepository.createRoomWithSeats(room, seats);

    return {
      room,
    };
  }
}
