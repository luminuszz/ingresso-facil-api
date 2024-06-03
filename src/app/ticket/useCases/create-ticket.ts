import { UseCaseImpl } from '@core/use-case-impl';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketEntity, TicketStatus } from '../ticket.entity';
import { ResourceNotFoundException } from '@core/errors';
import { TicketRepository } from '../ticket-repository';
import { MovieRepository } from '@app/movie/movie-repository';
import { isPast } from 'date-fns';
import { RoomRepository } from '@app/room/room-repository';

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
    private readonly roomRepository: RoomRepository,
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

    const seatIsInRoom = await this.roomRepository.findSeatInRoom(
      movieSession.roomId,
      seatId,
    );

    if (!seatIsInRoom) {
      throw new ResourceNotFoundException('Seat');
    }

    const sessionInThisSessions =
      await this.ticketRepository.findTicketByMovieSessionId(movieSession.id);

    const seatIsAvailable = !sessionInThisSessions.find(
      (ticket) => ticket.seatId === seatId,
    );

    if (!seatIsAvailable) {
      throw new BadRequestException('Seat is not available');
    }

    const ticket = TicketEntity.create({
      ownerTo: userId,
      seatId: seatIsInRoom.id,
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
