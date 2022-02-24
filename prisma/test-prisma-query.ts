import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const allAttendees = await prisma.attendee.findMany({
    include: {
      partyMembers: true,
      partyMembersThatIncludedMe: true,
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
  });

  const linkedAttendees = await prisma.attendee.findMany({
    where: {
      OR: [
        {
          partyMembers: {
            some: {
              name: 'Marty Penner',
            },
          },
        },
        {
          partyMembersThatIncludedMe: {
            some: {
              name: 'Marty Penner',
            },
          },
        },
      ],
    },
    include: {
      partyMembers: true,
      partyMembersThatIncludedMe: true,
      attendanceAnswers: true,
    },
  });

  // use `console.dir` to print nested objects
  console.dir(allAttendees, { depth: null });
  console.dir(linkedAttendees, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
