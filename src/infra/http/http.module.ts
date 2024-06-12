import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { CreateUser } from '@app/users/useCases/create-user';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserController } from './controllers/user.controller';
import { MovieController } from './controllers/movie.controller';
import { CreateMovie } from '@app/movie/useCases/create-movie';
import { CreateTicket } from '@app/ticket/useCases/create-ticket';
import { TicketController } from './controllers/ticket.controller';
import { CreateRoom } from '@app/room/useCases/create-room';
import { AddSeatToRoom } from '@app/room/useCases/add-seat-to-room';
import { ListSeatsInRoom } from '@app/room/useCases/list-seats-in-room';
import { RoomController } from './controllers/room.controller';
import { CreateMovieSession } from '@app/movie/useCases/create-movie-session';
import { ListMovieSessionSeats } from '@app/movie/useCases/list-movie-session-seats';
import { AuthController } from './controllers/auth.controller';
import { ValidateUser } from '@app/users/useCases/validate-user';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { HttpExceptionInterceptor } from './http-exception.interceptor';
import { CreateRoomWithSeats } from '@app/room/useCases/create-room-with-seats';
import { UpdateUser } from '@app/users/useCases/update-user';
import { TransferTicketOwner } from '@app/ticket/useCases/transfer-ticket-owner';

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
  UpdateUser,
  TransferTicketOwner,
];
``;
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
