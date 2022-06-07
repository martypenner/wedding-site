import { getAllRecords } from '~/airtable/client';
import type { AttendanceAnswers, PartyMembers } from '~/types';

type Data = {
	name: string;
	allowedEvents: ['ceremony'] | ['ceremony', 'reception'];
	partyMembers: PartyMembers;
	attendanceAnswers: AttendanceAnswers;
};

export async function getRsvpsByName(_name: string): Promise<Data> {
	const name = _name.trim().toLowerCase();

	// Grab all guests, then find the one requested along with all connected
	// ones. Airtable doesn't have a nice way of doing this built-in.
	const allAttendeeRecords = await getAllRecords();

	const partyLead = allAttendeeRecords.find((partyMember) => {
		return new Set(
			[partyMember.get('Guest'), partyMember.get('Guest (from Plus One)')?.[0]]
				.concat(partyMember.get('Guests (from Additional Guests)'))
				.filter(Boolean)
				.map((guest) => guest.trim().toLowerCase())
		).has(name);
	});

	if (partyLead == null) {
		throw new Error('404');
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

	return {
		allowedEvents: Array.from(response.allowedEvents),
		partyMembers: Array.from(response.partyMembers),
		attendanceAnswers: response.attendanceAnswers,
	} as Data;
}
