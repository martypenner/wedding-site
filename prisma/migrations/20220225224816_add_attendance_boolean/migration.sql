/*
  Warnings:

  - Added the required column `willAttend` to the `Ceremony` table without a default value. This is not possible if the table is not empty.
  - Added the required column `willAttend` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ceremony" ADD COLUMN     "willAttend" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "willAttend" BOOLEAN NOT NULL;
