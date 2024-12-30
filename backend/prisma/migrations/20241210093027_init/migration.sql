-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'SUPERVISOR', 'TEACHER', 'MODULE_HEAD');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_phone" INTEGER NOT NULL,
    "user_gender" TEXT,
    "Role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
