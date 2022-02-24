/*
  Warnings:

  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- DropTable
DROP TABLE "_friends";

-- CreateTable
CREATE TABLE "_groupedWith" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_groupedWith_AB_unique" ON "_groupedWith"("A", "B");

-- CreateIndex
CREATE INDEX "_groupedWith_B_index" ON "_groupedWith"("B");

-- AddForeignKey
ALTER TABLE "_groupedWith" ADD FOREIGN KEY ("A") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupedWith" ADD FOREIGN KEY ("B") REFERENCES "Attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
