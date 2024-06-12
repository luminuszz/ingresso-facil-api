import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Validate } from '../validators/zod-validation.pipe';
import {
  CreateTicketDto,
  createTicketSchema,
} from '../validators/tickets.schema';
import { CreateTicket } from '@app/ticket/useCases/create-ticket';
import { ProtectedFor, User } from '../../auth/guards/decorators';
import { ParseUUIDPipe } from '../validators/parse-uuid.pipe';
import { TransferTicketOwner } from '@app/ticket/useCases/transfer-ticket-owner';

@Controller('/tickets')
export class TicketController {
  constructor(
    private readonly createTicket: CreateTicket,
    private readonly transferTicketOwnerUseCase: TransferTicketOwner,
  ) {}

  @Post()
  @ProtectedFor('USER')
  @Validate(createTicketSchema)
  async createTicketPost(
    @Body() dto: CreateTicketDto,
    @User('id') userId: string,
  ) {
    await this.createTicket.execute({
      ...dto,
      userId,
    });
  }

  @ProtectedFor('USER')
  @Put(':ticketId/transfer-owner')
  async transferOwner(
    @Param('ticketId', ParseUUIDPipe) ticketId: string,
    @Body('newOwnerId', ParseUUIDPipe) newOwnerId: string,
  ) {
    await this.transferTicketOwnerUseCase.execute({
      ticketId,
      newOwnerId,
    });
  }
}
