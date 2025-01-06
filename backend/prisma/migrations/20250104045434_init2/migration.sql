/*
  Warnings:

  - The values [ORGANIZER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "event" AS ENUM ('CONCERT', 'FESTIVAL', 'SPORTS', 'MOVIES', 'THEATER', 'OTHERS');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "user" ALTER COLUMN "user_role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "user_role" TYPE "Role_new" USING ("user_role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "user" ALTER COLUMN "user_role" SET DEFAULT 'USER';
COMMIT;

-- CreateTable
CREATE TABLE "organizations" (
    "organizer_id" TEXT NOT NULL,
    "organizer_name" TEXT NOT NULL,
    "organizer_email" TEXT NOT NULL,
    "organizer_contact" TEXT,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("organizer_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_poster" TEXT NOT NULL,
    "event_date" TEXT NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_type" "event"[],
    "organizer_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "events_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" TEXT NOT NULL,
    "review_content" TEXT NOT NULL,
    "review_rating" INTEGER NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "ticket_id" TEXT NOT NULL,
    "ticket_price" INTEGER NOT NULL,
    "ticket_quantity" INTEGER NOT NULL,
    "event_id" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "organizations"("organizer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
