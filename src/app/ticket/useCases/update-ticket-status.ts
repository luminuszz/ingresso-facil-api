import { TicketStatus } from '@app/ticket/ticket.entity';
import { UseCaseImpl } from '@core/use-case-impl';
import { Injectable } from '@nestjs/common';
import { TicketRepository } from '@app/ticket/ticket-repository';
import { ResourceNotFoundException } from '@core/errors';

interface UpdateTicketStatusDto {
  ticketId: string;
  status: TicketStatus;
}

@Injectable()
export class UpdateTicketStatus
  implements UseCaseImpl<UpdateTicketStatusDto, void>
{
  constructor(private readonly ticketRepository: TicketRepository) {}

  async execute({ ticketId, status }: UpdateTicketStatusDto): Promise<void> {
    const existsTicket = await this.ticketRepository.findById(ticketId);

    if (!existsTicket) {
      throw new ResourceNotFoundException('Ticket not found');
    }

    existsTicket.status = status;

    await this.ticketRepository.save(existsTicket);
  }
}
