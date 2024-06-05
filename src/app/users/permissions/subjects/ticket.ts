import { z } from 'zod';
import { ticketModel } from '@app/users/permissions/models/ticket';

export const ticketSubject = z.tuple([
  z.union([
    z.literal('create'),
    z.literal('change-seat'),
    z.literal('change-room'),
    z.literal('cancel'),
    z.literal('transfer-owner'),
    z.literal('get'),
  ]),
  z.union([ticketModel, z.literal('Ticket')]),
]);

export type TicketSubject = z.infer<typeof ticketSubject>;
