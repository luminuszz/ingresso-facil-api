import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { CreateUser } from '@app/users/useCases/create-user';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserController } from './user.controller';
import { MovieController } from './movie.controller';
import { CreateMovie } from '@app/movie/useCases/create-movie';
import { CreateTicket } from '@app/ticket/useCases/create-ticket';
import { TicketController } from './ticket.controller';
import { CreateRoom } from '@app/room/useCases/create-room';
import { AddSeatToRoom } from '@app/room/useCases/add-seat-to-room';
import { ListSeatsInRoom } from '@app/room/useCases/list-seats-in-room';
import { RoomController } from './room.controller';
import { CreateMovieSession } from '@app/movie/useCases/create-movie-session';

const UseCases = [
  CreateUser,
  CreateMovie,
  CreateTicket,
  CreateRoom,
  AddSeatToRoom,
  ListSeatsInRoom,
  CreateMovieSession,
];

@Module({
  imports: [PrismaModule, EncryptModule],
  providers: [...UseCases],
  controllers: [
    UserController,
    MovieController,
    TicketController,
    RoomController,
  ],
})
export class HttpModule {}
