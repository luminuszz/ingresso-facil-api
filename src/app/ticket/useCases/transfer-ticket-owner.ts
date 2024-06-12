import { UseCaseImpl } from '@core/use-case-impl';
import { Injectable } from '@nestjs/common';
import { TicketRepository } from '@app/ticket/ticket-repository';
import {
  InvalidPermissionException,
  ResourceNotFoundException,
} from '@core/errors';
import { defineAbilityFor } from '@app/users/permissions';
import { UserRepository } from '@app/users/user-repository';
import { TicketEntity } from '@app/ticket/ticket.entity';

interface TransferTicketOwnerRequest {
  ticketId: string;
  newOwnerId: string;
}

@Injectable()
export class TransferTicketOwner
  implements UseCaseImpl<TransferTicketOwnerRequest, { ticket: TicketEntity }>
{
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    ticketId,
    newOwnerId,
  }: TransferTicketOwnerRequest): Promise<{ ticket: TicketEntity }> {
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new ResourceNotFoundException('Ticket');
    }

    const user = await this.userRepository.findById(ticket.ownerTo);

    if (!user) {
      throw new ResourceNotFoundException('User');
    }

    const userCanTransferOwner = defineAbilityFor(user).cannot(
      'transfer-owner',
      'Ticket',
    );

    if (userCanTransferOwner) {
      throw new InvalidPermissionException();
    }

    const newOwnerExists = await this.userRepository.findById(newOwnerId);

    if (!newOwnerExists) {
      throw new ResourceNotFoundException('new Owner');
    }

    ticket.ownerTo = newOwnerExists.id;

    await this.ticketRepository.save(ticket);

    return {
      ticket,
    };
  }
}
