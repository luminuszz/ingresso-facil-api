import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { CreateUser } from '../../app/users/useCases/create-user';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserController } from './user.controller';
import { MovieController } from './movie.controller';
import { CreateMovie } from '../../app/movie/useCases/create-movie';
import { CreateTicket } from '../../app/ticket/useCases/create-ticket';
import { TicketController } from './ticket.controller';

const UseCases = [CreateUser, CreateMovie, CreateTicket];

@Module({
  imports: [PrismaModule, EncryptModule],
  providers: [...UseCases],
  controllers: [UserController, MovieController, TicketController],
})
export class HttpModule {}
