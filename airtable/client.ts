import Airtable from 'airtable';

export const client = new Airtable({
	apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);
