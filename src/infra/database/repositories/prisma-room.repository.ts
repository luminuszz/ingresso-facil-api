import { RoomEntity, RoomType } from 'src/app/room/room.entity';
import { SeatEntity } from 'src/app/room/seat.entity';
import { RoomRepository } from '@app/room/room-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { Room as PrismaRom, Seat as PrismaSeat } from '@prisma/client';

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetchSeatsByRoomId(roomId: string): Promise<SeatEntity[]> {
    const results = await this.prisma.seat.findMany({
      where: {
        roomId,
      },
    });

    return results.map(this.parsePrismaSeatToSeatEntity);
  }

  async create(room: RoomEntity): Promise<void> {
    await this.prisma.room.create({
      data: {
        createdAt: room.createdAt,
        number: room.number,
        type: room.type,
      },
    });
  }
  async addSeatToRoom(seat: SeatEntity): Promise<void> {
    await this.prisma.seat.create({
      data: {
        roomId: seat.roomId,
        number: seat.number,
      },
    });
  }

  async findById(id: string): Promise<RoomEntity | null> {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    return room ? this.parsePrismaRoomToRoomEntity(room) : null;
  }

  private parsePrismaRoomToRoomEntity(prismaRoom: PrismaRom): RoomEntity {
    return RoomEntity.create(
      {
        type: RoomType[prismaRoom.type],
        number: prismaRoom.number,
        updatedAt: prismaRoom.createdAt,
        createdAt: prismaRoom.updatedAt,
      },
      prismaRoom.id,
    );
  }

  private parsePrismaSeatToSeatEntity(prismaSeat: PrismaSeat): SeatEntity {
    return SeatEntity.create(
      {
        roomId: prismaSeat.roomId,
        number: prismaSeat.number,
        createdAt: prismaSeat.createdAt,
        updatedAt: prismaSeat.updatedAt,
      },
      prismaSeat.id,
    );
  }
}
