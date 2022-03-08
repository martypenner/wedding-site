export type RsvpContext = {
	name: string;
	allowedEvents: Set<AllowedEvents>;
	partyMembers: PartyMembers;
	attendanceAnswers: AttendanceAnswers;
};

export type AllowedEvents = 'ceremony' | 'reception';

export type PartyMembers = {
	id: string;
	name: string;
}[];

export type Answers = {
	ceremony: {
		willAttend: boolean;
	};
	reception?: Partial<{
		willAttend: boolean;
		dietaryRestrictions: string;
		tuneThatWillMakeYouBoogie: string;
	}>;
};

export type AttendanceAnswers = Record<
	RsvpContext['partyMembers'][number]['id'],
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
	'Has RSVPed': boolean;
};

type Event = ['Ceremony'] | ['Ceremony', 'Reception'];
