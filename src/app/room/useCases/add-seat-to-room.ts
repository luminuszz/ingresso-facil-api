import { UseCaseImpl } from '@core/use-case-impl';
import { SeatEntity } from '../seat.entity';
import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../room-repository';
import { ResourceNotFoundException } from '@core/errors';

interface AddSeatToRoomRequest {
  roomId: string;
  seatNumber: number;
}

type AddSeatToRoomResponse = { seat: SeatEntity };

@Injectable()
export class AddSeatToRoom
  implements UseCaseImpl<AddSeatToRoomRequest, AddSeatToRoomResponse>
{
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute({
    seatNumber,
    roomId,
  }: AddSeatToRoomRequest): Promise<AddSeatToRoomResponse> {
    const existsRoom = await this.roomRepository.findById(roomId);

    if (!existsRoom) throw new ResourceNotFoundException('Room');

    const seat = SeatEntity.create({
      roomId: existsRoom.id,
      number: seatNumber,
      updatedAt: null,
      createdAt: new Date(),
    });

    await this.roomRepository.addSeatToRoom(seat);

    return {
      seat,
    };
  }
}
