/*
  Warnings:

  - You are about to drop the column `ceremony` on the `AttendanceAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `reception` on the `AttendanceAnswers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttendanceAnswers" DROP COLUMN "ceremony",
DROP COLUMN "reception",
ADD COLUMN     "ceremonyId" INTEGER,
ADD COLUMN     "receptionId" INTEGER;

-- CreateTable
CREATE TABLE "Ceremony" (
    "id" SERIAL NOT NULL,
    "whereSeated" TEXT,

    CONSTRAINT "Ceremony_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception" (
    "id" SERIAL NOT NULL,
    "dietaryRestrictions" TEXT,
    "anythingElse" TEXT,

    CONSTRAINT "Reception_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AttendanceAnswers" ADD CONSTRAINT "AttendanceAnswers_ceremonyId_fkey" FOREIGN KEY ("ceremonyId") REFERENCES "Ceremony"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceAnswers" ADD CONSTRAINT "AttendanceAnswers_receptionId_fkey" FOREIGN KEY ("receptionId") REFERENCES "Reception"("id") ON DELETE SET NULL ON UPDATE CASCADE;
