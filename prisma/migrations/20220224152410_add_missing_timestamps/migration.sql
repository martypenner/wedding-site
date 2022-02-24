/*
  Warnings:

  - Added the required column `updatedAt` to the `Ceremony` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reception` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ceremony" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reception" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
