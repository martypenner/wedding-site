/*
  Warnings:

  - You are about to drop the `AttendanceAnswers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[attendanceAnswerId]` on the table `Ceremony` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attendanceAnswerId]` on the table `Reception` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendanceAnswerId` to the `Ceremony` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendanceAnswerId` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AttendanceAnswers" DROP CONSTRAINT "AttendanceAnswers_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceAnswers" DROP CONSTRAINT "AttendanceAnswers_ceremonyId_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceAnswers" DROP CONSTRAINT "AttendanceAnswers_receptionId_fkey";

-- AlterTable
ALTER TABLE "Ceremony" ADD COLUMN     "attendanceAnswerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "attendanceAnswerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AttendanceAnswers";

-- CreateTable
CREATE TABLE "AttendanceAnswer" (
    "id" SERIAL NOT NULL,
    "ceremonyId" INTEGER,
    "receptionId" INTEGER,
    "attendeeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceAnswer_attendeeId_key" ON "AttendanceAnswer"("attendeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Ceremony_attendanceAnswerId_key" ON "Ceremony"("attendanceAnswerId");

-- CreateIndex
CREATE UNIQUE INDEX "Reception_attendanceAnswerId_key" ON "Reception"("attendanceAnswerId");

-- AddForeignKey
ALTER TABLE "AttendanceAnswer" ADD CONSTRAINT "AttendanceAnswer_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ceremony" ADD CONSTRAINT "Ceremony_attendanceAnswerId_fkey" FOREIGN KEY ("attendanceAnswerId") REFERENCES "AttendanceAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reception" ADD CONSTRAINT "Reception_attendanceAnswerId_fkey" FOREIGN KEY ("attendanceAnswerId") REFERENCES "AttendanceAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
