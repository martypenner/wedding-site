import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const allAttendees = (
    await prisma.attendee.findMany({
      include: {
        groupedWith: true,
        groupedWithReverse: true,
        attendanceAnswers: {
          select: {
            ceremony: {
              select: {
                whereSeated: true,
              },
            },
            reception: {
              select: {
                dietaryRestrictions: true,
                anythingElse: true,
              },
            },
          },
        },
      },
    })
  )
    // Combine groupedWith and groupedWithReverse
    .map((attendee) => ({
      ...attendee,
      groupedWith: attendee.groupedWith.concat(attendee.groupedWithReverse),
      groupedWithReverse: undefined,
    }));

  // use `console.dir` to print nested objects
  console.dir(allAttendees, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
