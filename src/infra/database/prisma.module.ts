import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '@app/users/user-repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { MovieRepository } from '@app/movie/movie-repository';
import { PrismaMovieRepository } from './repositories/prisma-movie.repository';
import { TicketRepository } from '@app/ticket/ticket-repository';
import { PrismaTicketRepository } from './repositories/prisma-ticket.repository';
import { RoomRepository } from '@app/room/room-repository';
import { PrismaRoomRepository } from './repositories/prisma-room.repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: MovieRepository, useClass: PrismaMovieRepository },
    { provide: TicketRepository, useClass: PrismaTicketRepository },
    { provide: RoomRepository, useClass: PrismaRoomRepository },
  ],
  exports: [
    PrismaService,
    UserRepository,
    MovieRepository,
    TicketRepository,
    RoomRepository,
  ],
})
export class PrismaModule {}
