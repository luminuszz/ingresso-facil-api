/*
  Warnings:

  - You are about to drop the column `ownwerTo` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ownerTo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_ownwerTo_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ownwerTo",
ADD COLUMN     "ownerTo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ownerTo_fkey" FOREIGN KEY ("ownerTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
