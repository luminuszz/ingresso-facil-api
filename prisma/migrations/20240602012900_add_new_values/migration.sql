/*
  Warnings:

  - You are about to drop the column `capacity` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seat_number` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "capacity";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "room_number",
DROP COLUMN "seat_number",
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "seat_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
