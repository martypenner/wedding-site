import { Ceremony, Reception } from '@prisma/client';

export type RsvpContext = {
	name: string;
	allowedEvents: Set<AllowedEvents>;
	partyMembers: PartyMembers;
	attendanceAnswers: AttendanceAnswers;
};

export type AllowedEvents = 'ceremony' | 'reception';

export type PartyMembers = string[];

export type Answers = {
	ceremony: Required<Pick<Ceremony, 'willAttend'>>;
	reception?: Partial<
		Pick<
			Reception,
			'willAttend' | 'dietaryRestrictions' | 'tuneThatWillMakeYouBoogie'
		>
	>;
};

export type AttendanceAnswers = Record<
	RsvpContext['partyMembers'][number],
	{
		ceremony: Answers['ceremony'];
		reception?: Required<Answers['reception']>;
	}
>;
