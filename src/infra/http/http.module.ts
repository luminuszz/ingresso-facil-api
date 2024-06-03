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
import { ListMovieSessionSeats } from '@app/movie/useCases/list-movie-session-seats';
import { AuthController } from './auth.controller';
import { ValidateUser } from '@app/users/useCases/validate-user';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { HttpExceptionInterceptor } from './http-exception.interceptor';
import { CreateRoomWithSeats } from '@app/room/useCases/create-room-with-seats';

const UseCases = [
  CreateUser,
  CreateMovie,
  CreateTicket,
  CreateRoom,
  AddSeatToRoom,
  ListSeatsInRoom,
  CreateMovieSession,
  ListMovieSessionSeats,
  ValidateUser,
  CreateRoomWithSeats,
];

@Module({
  imports: [PrismaModule, EncryptModule, AuthModule],
  providers: [
    ...UseCases,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_INTERCEPTOR, useClass: HttpExceptionInterceptor },
  ],
  controllers: [
    UserController,
    MovieController,
    TicketController,
    RoomController,
    AuthController,
  ],
})
export class HttpModule {}
