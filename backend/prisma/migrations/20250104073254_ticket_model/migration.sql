/*
  Warnings:

  - You are about to drop the column `organizer_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticket_type` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ticketType" AS ENUM ('VIP', 'REGULAR', 'STUDENT');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ORGANIZATION';

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizer_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_createdBy_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "organizer_id";

-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "ticket_type" "ticketType" NOT NULL;

-- DropTable
DROP TABLE "organizations";
