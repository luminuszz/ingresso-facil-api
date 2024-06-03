import { TicketEntity } from './ticket.entity';

export abstract class TicketRepository {
  abstract create(ticker: TicketEntity): Promise<void>;
  abstract save(ticket: TicketEntity): Promise<void>;
  abstract findById(id: string): Promise<TicketEntity | null>;
  abstract findTicketByMovieSessionId(
    movieSessionId: string,
  ): Promise<TicketEntity[]>;
}
