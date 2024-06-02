import { UseCaseImpl } from '../../../core/use-case-impl';
import { Injectable } from '@nestjs/common';
import { TicketEntity } from '../ticket.entity';
import { UserRepository } from '../../users/user-repository';
import { MovieRepository } from '../../movie/movie-repository';
import { ResourceNotFoundException } from '../../../core/errors';
import { TicketRepository } from '../ticket-repository';

interface CreateTicketRequest {
  userId: string;
  movieSessionId: string;
  roomId: string;
  seatId: string;
}

type CreateTicketResponse = { ticket: TicketEntity };

@Injectable()
export class CreateTicket
  implements UseCaseImpl<CreateTicketRequest, CreateTicketResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  async execute({
    movieSessionId,
    seatId,
    roomId,
    userId,
  }: CreateTicketRequest): Promise<CreateTicketResponse> {
    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      throw new ResourceNotFoundException('User');
    }

    const ticket = TicketEntity.create({
      ownerTo: existsUser.id,
      createdAt: new Date(),
      roomId,
      movieSessionId,
      seatId,
      updatedAt: null,
    });

    await this.ticketRepository.create(ticket);

    return {
      ticket,
    };
  }
}
