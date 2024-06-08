import { Body, Controller, Post } from '@nestjs/common';
import { Validate } from '../validators/zod-validation.pipe';
import {
  CreateTicketDto,
  createTicketSchema,
} from '../validators/tickets.schema';
import { CreateTicket } from '@app/ticket/useCases/create-ticket';
import { ProtectedFor, User } from '../../auth/guards/decorators';

@Controller('/tickets')
export class TicketController {
  constructor(private readonly createTicket: CreateTicket) {}

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
}
