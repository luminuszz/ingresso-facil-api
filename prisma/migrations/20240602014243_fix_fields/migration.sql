/*
  Warnings:

  - You are about to drop the column `date` on the `MovieSession` table. All the data in the column will be lost.
  - Added the required column `end_at` to the `MovieSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `MovieSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_at` to the `MovieSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RommType" AS ENUM ('IMAX', 'VIP', 'STANDARD');

-- AlterTable
ALTER TABLE "MovieSession" DROP COLUMN "date",
ADD COLUMN     "end_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" BIGINT NOT NULL,
ADD COLUMN     "start_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "type" "RommType" NOT NULL DEFAULT 'STANDARD';
