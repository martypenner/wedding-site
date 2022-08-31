import { useLoaderData } from '@remix-run/react';
import type {
	ActionFunction,
	LoaderFunction,
	MetaFunction,
} from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import qs from 'qs';
import React from 'react';
import { getAllRecords, updateRecords } from '~/airtable/client';
import NameForm from '~/components/NameForm';
import RespondingToRsvp from '~/components/RespondingToRsvp';
import InfoLayout from '~/layouts/InfoLayout';
import { getRsvpsByName } from '~/models/rsvp.server';
import type { AttendanceAnswers, RsvpData } from '~/types';
import { convertStringsToBooleans } from '~/utils';

export const meta: MetaFunction = () => ({
	title: 'RSVP — Marty Penner and Meaghan Jones',
});

// Fetch RSVPs if a name is provided.
export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const name = (url.searchParams.get('name') ?? '').trim();

	if (!url.searchParams.has('name')) {
		return null;
	}

	if (name.length === 0) {
		return json(null, { status: 400 });
	}

	try {
		const data = await getRsvpsByName(name);

		return data;
	} catch (error) {
		console.error(error);

		if ((error as object).toString().endsWith(' 404')) {
			return json(404, { status: 404 });
		}

		return json(null, {
			status: 403,
		});
	}
};

// Update RSVPs.
export const action: ActionFunction = async ({ request }) => {
	try {
		const formQueryString = await request.text();
		const answersByPerson = convertStringsToBooleans(
			qs.parse(formQueryString)
		) as AttendanceAnswers;

		const ids = Object.keys(answersByPerson);
		const matchingAttendees = (await getAllRecords()).filter((record) => {
			return ids.includes(record.id);
		});

		if (matchingAttendees.length !== ids.length) {
			throw new Error(`Not all names that were submitted match a person.`);
		}

		console.dir(answersByPerson, { depth: null });

		await updateRecords(
			Object.entries(answersByPerson).map(([id, answersByEvent]) => {
				return {
					id,
					fields: {
						'Will Attend Ceremony': answersByEvent.ceremony.willAttend,
						'Will Attend Reception':
							answersByEvent.reception?.willAttend ?? false,
						'Special Diet': answersByEvent.reception?.dietaryRestrictions ?? '',
						'Tune That Makes You Boogie':
							answersByEvent.reception?.tuneThatMakesYouBoogie ?? '',
						'Has RSVPed': true,
					},
				};
			})
		);

		return json({ ok: true });
	} catch (error) {
		console.error(error);
		return json(
			{ ok: false },
			{
				status: 403,
			}
		);
	}
};

export default function Rsvp() {
	const data = useLoaderData<RsvpData | 404>();

	return (
		<InfoLayout
			title="RSVP"
			description="Please let us know your plans by July 30, 2022. We hope we get to celebrate together!"
		>
			{data == null || data === 404 ? <NameForm /> : <RespondingToRsvp />}
		</InfoLayout>
	);
}
