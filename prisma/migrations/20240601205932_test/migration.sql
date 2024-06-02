/*
  Warnings:

  - You are about to drop the column `room_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seat_id` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `room_number` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_number` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_seat_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "room_id",
DROP COLUMN "seat_id",
ADD COLUMN     "room_number" INTEGER NOT NULL,
ADD COLUMN     "seat_number" INTEGER NOT NULL;
