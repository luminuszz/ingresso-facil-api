import { UseCaseImpl } from '../../../core/use-case-impl';
import { RoomEntity, RoomType } from '../room.entity';
import { Injectable } from '@nestjs/common';
import { RoomRepository } from '../room-repository';

interface CreateRoomRequest {
  number: number;
  type: RoomType;
}

type CreateRoomResponse = { room: RoomEntity };

@Injectable()
export class CreateRoom
  implements UseCaseImpl<CreateRoomRequest, CreateRoomResponse>
{
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute({
    number,
    type,
  }: CreateRoomRequest): Promise<CreateRoomResponse> {
    const room = RoomEntity.create({
      createdAt: new Date(),
      type,
      number,
      updatedAt: null,
    });

    await this.roomRepository.create(room);

    return {
      room,
    };
  }
}
