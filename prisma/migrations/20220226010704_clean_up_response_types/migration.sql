/*
  Warnings:

  - You are about to drop the column `whereSeated` on the `Ceremony` table. All the data in the column will be lost.
  - You are about to drop the column `anythingElse` on the `Reception` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ceremony" DROP COLUMN "whereSeated";

-- AlterTable
ALTER TABLE "Reception" DROP COLUMN "anythingElse",
ADD COLUMN     "tuneThatWillMakeYouBoogie" TEXT;
