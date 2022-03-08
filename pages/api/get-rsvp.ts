import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllRecords } from '../../airtable/client';
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

	try {
		// Grab all guests, then find the one requested along with all connected
		// ones. Airtable doesn't have a nice way of doing this built-in.
		const allAttendeeRecords = await getAllRecords();

		const partyLead = allAttendeeRecords.find((partyMember) => {
			return new Set(
				[
					partyMember.get('Guest'),
					partyMember.get('Guest (from Plus One)')?.[0],
				]
					.concat(partyMember.get('Guests (from Additional Guests)'))
					.filter(Boolean)
					.map((guest) => guest.trim().toLowerCase())
			).has(name);
		});

		if (partyLead == null) {
			res.status(404).end();
			return;
		}

		// Filter the records down to just the ones that match the given name,
		// including those who included the given name in their party.
		const matchingAttendeeRecords = [partyLead].concat(
			allAttendeeRecords.filter((partyMember) => {
				return [partyLead.get('Plus One')?.[0]]
					.concat(partyLead.get('Additional Guests'))
					.filter(Boolean)
					.includes(partyMember.id);
			})
		);

		console.dir(matchingAttendeeRecords, { depth: null });

		const attendees = matchingAttendeeRecords.map((record) => {
			return {
				id: record.id,
				name: record.get('Guest'),
				invitedEvents: partyLead
					.get('Invited Events')
					.map((event) => event.toUpperCase()),
				// Provide defaults
				attendanceAnswer: {
					ceremony: {
						willAttend: record.get('Will Attend Ceremony') ?? false,
					},
					reception: {
						willAttend: record.get('Will Attend Reception') ?? false,
						dietaryRestrictions: record.get('Special Diet') ?? '',
						tuneThatMakesYouBoogie:
							record.get('Tune That Makes You Boogie') ?? '',
					},
				},
			};
		});

		console.dir(attendees, { depth: null });

		const response = attendees.reduce(
			(acc, person) => {
				return {
					...acc,

					// Build up allowed events for EVERYONE. We assume that the highest
					// level of access applies to everyone in the party.
					allowedEvents: new Set(
						Array.from(acc.allowedEvents).concat(person.invitedEvents)
					),
					partyMembers: acc.partyMembers.add({
						id: person.id,
						name: person.name,
					}),
					attendanceAnswers: {
						...acc.attendanceAnswers,
						[person.id]: person.attendanceAnswer,
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
