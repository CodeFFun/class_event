/*
  Warnings:

  - You are about to drop the column `ticket_type` on the `ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "ticket_type";

-- DropEnum
DROP TYPE "ticketType";
