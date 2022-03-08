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

export type AirtableGuestRecord = {
	Guest: string;
	'Guest (from Plus One)': string[];
	'Plus One': string[];
	'Guests (from Additional Guests)': string[];
	'Additional Guests': string[];
	'Invited Events': Event;
	'Will Attend Ceremony': boolean;
	'Will Attend Reception': boolean;
	'Special Diet': string;
	'Tune That Makes You Boogie': string;
};

type Event = ['Ceremony'] | ['Ceremony', 'Reception'];
