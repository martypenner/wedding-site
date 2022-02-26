/*
  Warnings:

  - You are about to drop the column `ceremonyId` on the `AttendanceAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `receptionId` on the `AttendanceAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttendanceAnswer" DROP COLUMN "ceremonyId",
DROP COLUMN "receptionId";
