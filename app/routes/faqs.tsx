import type { MetaFunction } from '@remix-run/server-runtime';
import React from 'react';
import InfoLayout from '~/layouts/InfoLayout';

export const meta: MetaFunction = () => ({
	title: 'FAQs — Marty Penner and Meaghan Jones',
});

type Faqs = {
	question: string;
	answer: string;
}[];

const faqs: Faqs = [
	{
		question: 'When should I RSVP by?',
		answer:
			'RSPVs are now closed! Thanks for responding, and we look forward to celebrating with you!',
	},
	{
		question: 'Are you registered? Where?',
		answer:
			'Nope! But we would LOVE if you contributed to our Italy fund! Either bring cash in an envelope to the wedding, or e-transfer marty@penner.me.',
	},
	{
		question: 'Can I bring a date?',
		answer: 'Does your RSVP (coming soon) say "+1"? Then yes.',
	},
	{
		question: 'Are kids welcome?',
		answer:
			'Unfortunately, we can only accommodate a few close children. Your RSVP will let you know.',
	},
	{
		question: 'Will there be parking for the ceremony or reception?',
		answer:
			'Yes. Parking will be available for free in the large entrance lot on the clubhouse grounds.',
	},
	{
		question:
			'Will there be transportation to and from the hotels to the ceremony?',
		answer: 'No. Please arrange something in advance if you plan to drink.',
	},
	{
		question:
			'Are there any other events that I should know about around the wedding?',
		answer: `Unfortunately, the golf course closes the week before. We're brewing up some other ideas, so check back soon before the wedding.`,
	},
];

export default function FAQs() {
	return (
		<InfoLayout
			title="Faqs"
			description="If you have any questions other than what we've listed here, please reach out to us."
			hasGap
			smallDeviceBlocks={faqs.map((faq) => (
				<div key={Math.random()} className="mx-4 mt-8 text-center">
					<p className="mb-4 font-cardo text-lg italic">Question</p>

					<h3 className="mb-12 text-3xl uppercase">{faq.question}</h3>

					<p className="mb-4 font-cardo text-lg italic">Answer</p>

					<p>{faq.answer}</p>
				</div>
			))}
			largeDeviceBlocks={faqs.map((faq) => {
				return {
					left: (
						<React.Fragment>
							<div className="text-center">
								<p className="mb-4 font-cardo text-lg italic">Question</p>

								<h3 className="text-3xl uppercase">{faq.question}</h3>
							</div>
						</React.Fragment>
					),

					right: (
						<React.Fragment>
							<div className="text-center">
								<p className="mb-4 font-cardo text-lg italic">Answer</p>

								<p>{faq.answer}</p>
							</div>
						</React.Fragment>
					),
				};
			})}
		/>
	);
}
