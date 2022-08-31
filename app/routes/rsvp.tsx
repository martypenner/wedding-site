import type { MetaFunction } from '@remix-run/server-runtime';
import { Fragment } from 'react';
import InfoLayout from '~/layouts/InfoLayout';

export const meta: MetaFunction = () => ({
	title: 'RSVP — Marty Penner and Meaghan Jones',
});

export default function Rsvp() {
	return (
		<InfoLayout
			title="RSVP"
			description="RSVPs are now closed. Thanks for getting back to us! We look forward to celebrating with you!"
		>
			<Fragment></Fragment>
		</InfoLayout>
	);
}
