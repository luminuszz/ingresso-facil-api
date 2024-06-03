import { UseCaseImpl } from '../../../core/use-case-impl';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity, TicketStatus } from '../ticket.entity';
import { UserRepository } from '../../users/user-repository';
import { ResourceNotFoundException } from '../../../core/errors';
import { TicketRepository } from '../ticket-repository';
import { MovieRepository } from '@app/movie/movie-repository';
import { isPast } from 'date-fns';

interface CreateTicketRequest {
  userId: string;
  movieSessionId: string;
  seatId: string;
}

type CreateTicketResponse = { ticket: TicketEntity };

@Injectable()
export class CreateTicket
  implements UseCaseImpl<CreateTicketRequest, CreateTicketResponse>
{
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute({
    movieSessionId,
    seatId,
    userId,
  }: CreateTicketRequest): Promise<CreateTicketResponse> {
    const movieSession =
      await this.movieRepository.findMovieSessionById(movieSessionId);

    if (!movieSession) {
      throw new ResourceNotFoundException('MovieSession');
    }

    const sessionIsAlreadyEnded = isPast(movieSession.endsAt);

    if (sessionIsAlreadyEnded) {
      throw new BadRequestException('Movie session is already ended');
    }

    const tickets = await this.ticketRepository.findTicketByMovieSessionId(
      movieSession.id,
    );

    const seatIsAvailable = !tickets.find((ticket) => ticket.seatId === seatId);

    if (!seatIsAvailable) {
      throw new BadRequestException('Seat is not available');
    }

    const ticket = TicketEntity.create({
      ownerTo: userId,
      seatId: seatId,
      roomId: movieSession.roomId,
      movieSessionId: movieSession.id,
      createdAt: new Date(),
      updatedAt: null,
      status: TicketStatus.RESERVED,
    });

    await this.ticketRepository.create(ticket);

    return {
      ticket,
    };
  }
}
