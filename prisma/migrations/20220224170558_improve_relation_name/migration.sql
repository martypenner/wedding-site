/*
  Warnings:

  - You are about to drop the `_groupedWith` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_groupedWith" DROP CONSTRAINT "_groupedWith_A_fkey";

-- DropForeignKey
ALTER TABLE "_groupedWith" DROP CONSTRAINT "_groupedWith_B_fkey";

-- DropTable
DROP TABLE "_groupedWith";

-- CreateTable
CREATE TABLE "_partyMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_partyMembers_AB_unique" ON "_partyMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_partyMembers_B_index" ON "_partyMembers"("B");

-- AddForeignKey
ALTER TABLE "_partyMembers" ADD FOREIGN KEY ("A") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_partyMembers" ADD FOREIGN KEY ("B") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
