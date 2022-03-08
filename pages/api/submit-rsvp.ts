import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'qs';
import { getAllRecords, updateRecords } from '../../airtable/client';
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

	try {
		const answersByPerson = convertStringsToBooleans(
			qs.parse(req.body).attendanceAnswers as unknown as AttendanceAnswers
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
							answersByEvent.reception?.tuneThatWillMakeYouBoogie ?? '',
						'Has RSVPed': true,
					},
				};
			})
		);

		res.status(200).json(null);
	} catch (error) {
		console.info(error);
		res.status(403).end();
	}

	return;
}
