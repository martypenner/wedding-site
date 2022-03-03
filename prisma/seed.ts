import { AllowedEvents, PrismaClient } from '@prisma/client';
import attendees from './data.json';

const prisma = new PrismaClient();

async function main() {
	for (const attendee of attendees) {
		const allowedEvents = attendee['Invited Events']
			.split(',')
			.map((event) => event.toUpperCase()) as AllowedEvents[];

		// Grab all party members from the "plus one" up to "additional guest 6".
		const partyMembers = [attendee['Plus One']].concat(
			...Array(6)
				.fill(null)
				.map((_, index) => attendee[`Additional Guest ${index + 1}`])
				.filter((name) => name.trim().length > 0)
		);

		const attendeeUpsertResponse = await prisma.attendee.upsert({
			where: {
				name: attendee.Guest,
			},
			update: {},
			create: {
				name: attendee.Guest,
				allowedEvents,
				partyMembers: {
					create: partyMembers.map((partyMember) => ({
						name: partyMember,
						allowedEvents,
					})),
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

		console.dir({ attendeeUpsertResponse }, { depth: null });
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
