import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const name = 'Theo Boniferous'.toLowerCase();
  const allAttendees = await prisma.attendee.findMany({
    include: {
      partyMembers: true,
      partyMembersThatIncludedMe: true,
      attendanceAnswer: {
        select: {
          ceremony: {
            select: {
              willAttend: true,
              whereSeated: true,
            },
          },
          reception: {
            select: {
              willAttend: true,
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
              name: {
                equals: name,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          partyMembersThatIncludedMe: {
            some: {
              name: {
                equals: name,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    },
    include: {
      partyMembers: true,
      partyMembersThatIncludedMe: true,
      attendanceAnswer: true,
    },
  });

  // use `console.dir` to print nested objects
  console.dir(allAttendees, { depth: null });
  console.dir(linkedAttendees, { depth: null });

  await prisma.attendanceAnswer.update({
    where: {
      id: 1,
    },
    data: {
      ceremony: {
        update: {
          willAttend: false,
          whereSeated: 'there',
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
