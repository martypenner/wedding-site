import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/client';
import { AttendanceAnswers, PartyMembers } from '../../utils/types';

type Data = {
	allowedEvents: ['ceremony'] | ['ceremony', 'reception'];
	partyMembers: PartyMembers;
	attendanceAnswers: AttendanceAnswers;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== 'POST') {
		res.status(403).end();
		return;
	}

	const { name: providedName } = req.body;
	const name = providedName.trim().toLowerCase();
	const includePayload = {
		partyMembers: true,
		partyMembersThatIncludedMe: true,
		attendanceAnswer: {
			select: {
				ceremony: {
					select: {
						willAttend: true,
					},
				},
				reception: {
					select: {
						willAttend: true,
						dietaryRestrictions: true,
						tuneThatWillMakeYouBoogie: true,
					},
				},
			},
		},
	};

	try {
		// Using `findFirst` rather than `findUnique` so we can search
		// case-insensitively.
		const matchingAttendee = await prisma.attendee.findFirst({
			where: {
				name: {
					equals: name,
					mode: 'insensitive',
				},
			},
			include: includePayload,
		});

		if (matchingAttendee == null) {
			res.status(404).end();
			return;
		}

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
			include: includePayload,
		});

		// Combine `partyMembers` and `partyMembersThatIncludedMe` so grouped
		// attendees can respond for each other.
		const allPartyMembers = [matchingAttendee]
			.concat(linkedAttendees)
			.map((attendee) =>
				attendee.partyMembers.concat(attendee.partyMembersThatIncludedMe)
			)
			.flat(Infinity);

		// Finally grab all attendees based on the previous 2-degree-separated party
		// members.
		const allAttendees = await prisma.attendee.findMany({
			where: {
				id: {
					// @ts-expect-error
					in: allPartyMembers.map(({ id }) => id),
				},
			},
			include: includePayload,
		});

		// Group the individual and all group members to create a response object
		const attendees = allAttendees.map((attendee) => ({
			...attendee,
			partyMembers: allPartyMembers,
			partyMembersThatIncludedMe: undefined,
		}));
		console.dir(attendees, { depth: null });

		const response = attendees.reduce(
			(acc, person) => {
				return {
					...acc,

					// Build up allowed events for EVERYONE. We assume that the highest
					// level of access applies to everyone in the party.
					allowedEvents: new Set(
						Array.from(acc.allowedEvents).concat(person.allowedEvents)
					),
					partyMembers: acc.partyMembers.add(person.name),
					attendanceAnswers: {
						...acc.attendanceAnswers,
						[person.name]: {
							// Provide defaults
							ceremony: {
								willAttend: false,
								...person.attendanceAnswer?.ceremony,
							},
							reception: person.attendanceAnswer?.reception ?? {
								willAttend: false,
							},
						},
					},
				};
			},
			{
				allowedEvents: new Set(),
				partyMembers: new Set(),
				attendanceAnswers: {},
			}
		);

		res.status(200).json({
			allowedEvents: Array.from(
				response.allowedEvents
			) as Data['allowedEvents'],
			partyMembers: Array.from(response.partyMembers) as Data['partyMembers'],
			attendanceAnswers: response.attendanceAnswers,
		});
	} catch (error) {
		console.info(error);
		res.status(403).end();
	}

	return;
}
