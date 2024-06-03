import { UseCaseImpl } from '@core/use-case-impl';
import { SeatEntity } from '../seat.entity';
import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../room-repository';
import { ResourceNotFoundException } from '@core/errors';

interface ListSeatsInRoomRequest {
  roomId: string;
}

type ListSeatsInRoomResponse = { seats: SeatEntity[] };

@Injectable()
export class ListSeatsInRoom
  implements UseCaseImpl<ListSeatsInRoomRequest, ListSeatsInRoomResponse>
{
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute({
    roomId,
  }: ListSeatsInRoomRequest): Promise<ListSeatsInRoomResponse> {
    const existsRoom = await this.roomRepository.findById(roomId);

    if (!existsRoom) throw new ResourceNotFoundException('Room');

    const seats = await this.roomRepository.fetchSeatsByRoomId(existsRoom.id);

    return {
      seats,
    };
  }
}
