-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('RESERVED', 'PURCHASED');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'RESERVED';
