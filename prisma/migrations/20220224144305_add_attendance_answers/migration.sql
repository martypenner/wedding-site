-- CreateTable
CREATE TABLE "AttendanceAnswers" (
    "id" SERIAL NOT NULL,
    "ceremony" BOOLEAN NOT NULL DEFAULT false,
    "reception" BOOLEAN NOT NULL DEFAULT false,
    "attendeeId" INTEGER NOT NULL,

    CONSTRAINT "AttendanceAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AttendanceAnswers" ADD CONSTRAINT "AttendanceAnswers_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Attendee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
