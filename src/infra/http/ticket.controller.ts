import { Body, Controller, Post } from '@nestjs/common';
import { Validate } from './validators/zod-validation.pipe';
import {
  CreateTicketDto,
  createTicketSchema,
} from './validators/tickets.schema';
import { CreateTicket } from '../../app/ticket/useCases/create-ticket';

@Controller('/tickets')
export class TicketController {
  constructor(private readonly createTicket: CreateTicket) {}

  @Post()
  @Validate(createTicketSchema)
  async createTicketPost(@Body() dto: CreateTicketDto) {
    await this.createTicket.execute(dto);
  }
}
