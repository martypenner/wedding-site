import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const theoName = 'Theo Boniferous';
  const theo = await prisma.attendee.upsert({
    where: {
      name: theoName,
    },
    update: {},
    create: {
      name: theoName,
      allowedEvents: ['CEREMONY', 'RECEPTION'],
      partyMembers: {
        create: [
          {
            name: 'Barbara Pines',
            allowedEvents: ['CEREMONY'],
          },
          {
            name: 'Jimmy Elm',
            allowedEvents: ['RECEPTION'],
            attendanceAnswer: {
              create: {
                ceremony: {
                  create: {
                    willAttend: false,
                  },
                },
                reception: {
                  create: {
                    willAttend: false,
                  },
                },
              },
            },
          },
        ],
      },
      attendanceAnswer: {
        create: {
          ceremony: {
            create: {
              willAttend: true,
            },
          },
          reception: {
            create: {
              willAttend: true,
              dietaryRestrictions: 'seeds',
              tuneThatWillMakeYouBoogie: 'Cat Stevens',
            },
          },
        },
      },
    },
    include: {
      attendanceAnswer: true,
      partyMembers: true,
      partyMembersThatIncludedMe: true,
    },
  });

  console.dir({ theo });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
