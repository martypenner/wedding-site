import Airtable, { Record } from 'airtable';
import { AirtableGuestRecord } from '../utils/types';

const client = new Airtable({
	apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

export const getAllRecords = () =>
	new Promise<Record<AirtableGuestRecord>[]>((resolve, reject) => {
		let matchingRecords = [];

		client<AirtableGuestRecord>('Guests')
			.select({
				view: 'Main View',
			})
			.eachPage(
				// This function (`page`) will get called for each page of records.
				function page(records, fetchNextPage) {
					matchingRecords = matchingRecords.concat(records);

					// To fetch the next page of records, call `fetchNextPage`. If there
					// are more records, `page` will get called again. If there are no
					// more records, `done` will get called.
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						reject(err);
					} else {
						resolve(matchingRecords);
					}
				}
			);
	});

export const updateRecords = (
	records: {
		id: string;
		fields: Partial<AirtableGuestRecord>;
	}[]
) => {
	return new Promise<null>((resolve, reject) => {
		client<AirtableGuestRecord>('Guests').update(records, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve(null);
			}
		});
	});
};
