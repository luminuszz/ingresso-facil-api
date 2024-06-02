/*
  Warnings:

  - You are about to drop the column `assignee_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `UserEntity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownwerTo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignee_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "assignee_id",
ADD COLUMN     "ownwerTo" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserEntity";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ownwerTo_fkey" FOREIGN KEY ("ownwerTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
