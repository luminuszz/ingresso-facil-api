import { TicketEntity, TicketStatus } from 'src/app/ticket/ticket.entity';
import { TicketRepository } from '@app/ticket/ticket-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Ticket as PrismaTicket,
  Movie as PrismaMovie,
  User as PrismaUser,
} from '@prisma/client';

interface PrismaTicketWithRelation extends PrismaTicket {
  movie: PrismaMovie;
  owner: PrismaUser;
}

@Injectable()
export class PrismaTicketRepository implements TicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(ticket: TicketEntity): Promise<void> {
    await this.prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        status: ticket.status,
        ownerTo: ticket.ownerTo,
        seatId: ticket.seatId,
        movieSessionId: ticket.movieSessionId,
        roomId: ticket.room,
      },
    });
  }

  async findTicketByMovieSessionId(
    movieSessionId: string,
  ): Promise<TicketEntity[]> {
    const tickets = await this.prisma.ticket.findMany({
      where: {
        movieSessionId,
      },
    });

    return tickets.map(this.parsePrismaTicketToTicket);
  }

  async create(ticket: TicketEntity): Promise<void> {
    await this.prisma.ticket.create({
      data: {
        createdAt: ticket.createdAt,
        movieSessionId: ticket.movieSessionId,
        roomId: ticket.room,
        ownerTo: ticket.ownerTo,
        seatId: ticket.seatId,
        status: TicketStatus[ticket.status],
      },
    });
  }

  private parsePrismaTicketToTicket(
    ticket: PrismaTicket | PrismaTicketWithRelation,
  ): TicketEntity {
    return TicketEntity.create(
      {
        createdAt: ticket.createdAt,
        seatId: ticket.seatId,
        movieSessionId: ticket.movieSessionId,
        roomId: ticket.roomId,
        ownerTo: ticket.ownerTo,
        updatedAt: ticket.updatedAt,
        status: TicketStatus[ticket.status],
      },
      ticket.id,
    );
  }

  async findById(id: string): Promise<TicketEntity | null> {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    return ticket ? this.parsePrismaTicketToTicket(ticket) : null;
  }
}
