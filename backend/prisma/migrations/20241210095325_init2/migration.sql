/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_phone" INTEGER NOT NULL,
    "user_gender" TEXT,
    "Role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);
