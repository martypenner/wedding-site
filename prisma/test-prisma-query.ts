import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const name = 'Theo Boniferous';
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
              name,
            },
          },
        },
        {
          partyMembersThatIncludedMe: {
            some: {
              name,
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

  await prisma.attendanceAnswers.update({
    where: {
      id: 1,
    },
    data: {
      ceremony: {
        upsert: {
          create: {
            willAttend: true,
            whereSeated: 'here',
          },
          update: {
            willAttend: false,
            whereSeated: 'there',
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
