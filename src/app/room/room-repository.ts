import { RoomEntity } from './room.entity';
import { SeatEntity } from './seat.entity';

export abstract class RoomRepository {
  abstract create(room: RoomEntity): Promise<void>;
  abstract addSeatToRoom(seat: SeatEntity): Promise<void>;
  abstract findById(id: string): Promise<RoomEntity | null>;
  abstract fetchSeatsByRoomId(roomId: string): Promise<SeatEntity[]>;
  abstract findSeatInRoom(
    roomId: string,
    seatId: string,
  ): Promise<SeatEntity | null>;
}
