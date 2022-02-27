import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import { prisma } from '../../prisma/client';
import { AttendanceAnswers } from '../../utils/types';
import { convertStringsToBooleans } from '../../utils/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  if (req.method !== 'POST') {
    res.status(403).end();
    return;
  }

  const answersByPerson = convertStringsToBooleans(
    qs.parse(req.body).attendanceAnswers as unknown as AttendanceAnswers
  ) as AttendanceAnswers;

  try {
    const names = Object.keys(answersByPerson);
    const matchingAttendees = await prisma.attendee.findMany({
      where: {
        OR: names.map((name) => ({
          name,
        })),
      },
    });

    if (matchingAttendees.length !== names.length) {
      throw new Error(`Not all names that were submitted match a person.`);
    }

    const promises = Object.entries(answersByPerson).map(
      async ([name, answersByEvent]) => {
        return prisma.attendee.update({
          where: {
            name,
          },
          data: {
            attendanceAnswer: {
              upsert: {
                create: {
                  ceremony: {
                    create: answersByEvent.ceremony,
                  },
                  reception: {
                    create: answersByEvent.reception,
                  },
                },
                update: {
                  ceremony: {
                    upsert: {
                      create: answersByEvent.ceremony,
                      update: answersByEvent.ceremony,
                    },
                  },
                  reception:
                    answersByEvent.reception == null
                      ? undefined
                      : {
                          upsert: {
                            create: answersByEvent.reception,
                            update: answersByEvent.reception,
                          },
                        },
                },
              },
            },
          },
        });
      }
    );

    await Promise.allSettled(promises);
    res.status(200).json(null);
  } catch (error) {
    console.info(error);
    res.status(403).end();
  }

  return;
}
