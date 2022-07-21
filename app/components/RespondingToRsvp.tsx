import { RadioGroup } from '@headlessui/react';
import {
	Form,
	useActionData,
	useLoaderData,
	useSearchParams,
	useTransition,
} from '@remix-run/react';
import React, { Fragment } from 'react';
import type { AllowedEvents, Answers, RsvpContext, RsvpData } from '~/types';
import { classNames } from '~/utils';
import CeremonyDateTime from './CeremonyDateTime';
import CeremonyDetails from './CeremonyDetails';
import ErrorNotification from './ErrorNotification';
import ReceptionDateTime from './ReceptionDateTime';
import ReceptionDetails from './ReceptionDetails';
import SuccessDialog from './SuccessDialog';

export default function RespondingToRsvp() {
	const {
		allowedEvents: initialAllowedEvents,
		partyMembers,
		attendanceAnswers: initialAttendanceAnswers,
	} = useLoaderData<RsvpData>();
	// @ts-expect-error
	const allowedEvents = new Set(initialAllowedEvents);
	const [attendanceAnswers, setAttendanceAnswers] = React.useState(
		initialAttendanceAnswers
	);

	const actionData = useActionData<{ ok: boolean }>();
	const [showSuccess, setShowSuccess] = React.useState(true);

	const transition = useTransition();
	const isSubmitting = transition.state === 'submitting';

	const [searchParams] = useSearchParams();
	const name = searchParams.get('name');

	const handleChangeAttendanceAnswer = ({
		partyMember,
		weddingEvent,
		answers,
	}: {
		partyMember: RsvpContext['partyMembers'][number]['id'];
		weddingEvent: AllowedEvents;
		answers: Answers[typeof weddingEvent];
	}) => {
		setAttendanceAnswers({
			...attendanceAnswers,
			[partyMember]: {
				...attendanceAnswers[partyMember],
				[weddingEvent]: {
					...attendanceAnswers[partyMember][weddingEvent],
					...answers,
				},
			},
		});
	};

	return (
		<>
			<Form
				method="post"
				action={`?name=${name}`}
				// Spaces in the query param get replaced with %20, adding an extra URL
				// to the stack. We want to fix that.
				replace
				className="mx-4 mt-8 text-center"
			>
				{allowedEvents.size === 1 ? (
					<p>
						We have invited you to 1 wedding event, 1 of which requires your
						RSVP.
					</p>
				) : (
					<p>
						We have invited you to {allowedEvents.size} wedding events,{' '}
						{allowedEvents.size} of which require your RSVP.
					</p>
				)}

				<div className="mt-8 grid grid-cols-1 items-center divide-black sm:grid-cols-2 sm:divide-x">
					<div className="py-4 sm:py-16 sm:pr-8">
						<CeremonyDateTime />
						<CeremonyDetails />
					</div>

					<div className="py-4 text-center font-cardo sm:py-16 sm:pl-16">
						{Array.from(partyMembers).map(({ id, name }, index) => (
							<div
								key={id}
								className={
									index === Array.from(partyMembers).length - 1 ? '' : 'mb-16'
								}
							>
								<p className="mb-4 italic">{name}</p>

								<RadioGroup
									value={attendanceAnswers[id]?.ceremony.willAttend ?? true}
									onChange={(willAttend) => {
										handleChangeAttendanceAnswer({
											partyMember: id,
											weddingEvent: 'ceremony',
											answers: {
												willAttend,
											},
										});
									}}
								>
									<RadioGroup.Label className="sr-only">
										{name}'s RSVP
									</RadioGroup.Label>

									<div className="flex flex-row items-center justify-between space-x-4">
										{[true, false].map((willAttend) => (
											<RadioGroup.Option
												key={String(willAttend)}
												value={willAttend}
												className={({ active }) =>
													classNames(
														active ? 'focus-gold' : '',
														'relative flex-grow cursor-pointer shadow-sm focus:outline-none sm:flex sm:justify-between'
													)
												}
											>
												{({ checked }) => (
													<Fragment>
														<input
															type="checkbox"
															className="hidden"
															name={`${id}[ceremony][willAttend]`}
															value={String(willAttend)}
															checked={checked}
															onChange={() => {}}
														/>

														<div className="flex flex-grow items-center">
															<RadioGroup.Label
																as="span"
																className="button button--small m-0 flex-grow"
															>
																{willAttend ? 'Will attend' : 'Will not attend'}
															</RadioGroup.Label>
														</div>

														<div
															className={classNames(
																checked ? 'border-gold' : 'border-transparent',
																'pointer-events-none absolute -inset-px border-4'
															)}
															aria-hidden="true"
														/>
													</Fragment>
												)}
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>
						))}
					</div>
				</div>

				{allowedEvents.size > 1 && (
					<div className="grid grid-cols-1 items-center divide-black sm:grid-cols-2 sm:divide-x">
						<div className="pt-16 pb-4 sm:py-16 sm:pr-8">
							<ReceptionDateTime />
							<ReceptionDetails />
						</div>

						<div className="py-4 text-center font-cardo sm:py-16 sm:pl-16">
							{Array.from(partyMembers).map(({ id, name }, index) => (
								<div
									key={id}
									className={
										index === Array.from(partyMembers).length - 1 ? '' : 'mb-16'
									}
								>
									<p className="mb-4 italic">{name}</p>

									<RadioGroup
										value={attendanceAnswers[id]?.reception?.willAttend ?? true}
										onChange={(willAttend) => {
											handleChangeAttendanceAnswer({
												partyMember: id,
												weddingEvent: 'reception',
												answers: {
													willAttend,
												},
											});
										}}
									>
										<RadioGroup.Label className="sr-only">
											{name}'s RSVP
										</RadioGroup.Label>

										<div className="flex flex-row items-center justify-between space-x-4">
											{[true, false].map((willAttend) => (
												<RadioGroup.Option
													key={String(willAttend)}
													value={willAttend}
													className={({ active }) =>
														classNames(
															active ? 'focus-gold' : '',
															'relative flex-grow cursor-pointer shadow-sm focus:outline-none sm:flex sm:justify-between'
														)
													}
												>
													{({ checked }) => (
														<Fragment>
															<input
																type="checkbox"
																className="hidden"
																name={`${id}[reception][willAttend]`}
																value={String(willAttend)}
																checked={checked}
																onChange={() => {}}
															/>

															<div className="flex flex-grow items-center">
																<RadioGroup.Label
																	as="span"
																	className="button button--small m-0 flex-grow"
																>
																	{willAttend
																		? 'Will attend'
																		: 'Will not attend'}
																</RadioGroup.Label>
															</div>

															<div
																className={classNames(
																	checked
																		? 'border-gold'
																		: 'border-transparent',
																	'pointer-events-none absolute -inset-px border-4'
																)}
																aria-hidden="true"
															/>
														</Fragment>
													)}
												</RadioGroup.Option>
											))}
										</div>
									</RadioGroup>

									<div className="mt-12 text-left">
										<div>
											<label htmlFor="email" className="block">
												Any dietary restrictions we should know of?
											</label>
											<div className="mt-2">
												<input
													type="text"
													name={`${id}[reception][dietaryRestrictions]`}
													id="dietaryRestrictions"
													value={
														attendanceAnswers[id]?.reception
															?.dietaryRestrictions ?? ''
													}
													onChange={(event) => {
														handleChangeAttendanceAnswer({
															partyMember: id,
															weddingEvent: 'reception',
															answers: {
																dietaryRestrictions: event.target.value,
															},
														});
													}}
												/>
											</div>
										</div>

										<div className="mt-6">
											<label htmlFor="email" className="block">
												Name a tune that will make you boogie.
											</label>
											<div className="mt-2">
												<input
													type="text"
													name={`${id}[reception][tuneThatMakesYouBoogie]`}
													id="tuneThatMakesYouBoogie"
													value={
														attendanceAnswers[id]?.reception
															?.tuneThatMakesYouBoogie ?? ''
													}
													onChange={(event) => {
														handleChangeAttendanceAnswer({
															partyMember: id,
															weddingEvent: 'reception',
															answers: {
																tuneThatMakesYouBoogie: event.target.value,
															},
														});
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				<button type="submit" className="mx-auto mt-8">
					{isSubmitting ? (
						<Fragment>
							<svg
								className="-ml-1 mr-3 h-5 w-5 animate-spin text-black group-hover:text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Submitting your RSVP…
						</Fragment>
					) : (
						<span>Submit RSVP</span>
					)}
				</button>

				{actionData?.ok && showSuccess && (
					<SuccessDialog
						onCloseDialog={() => {
							setShowSuccess(false);
						}}
					/>
				)}
			</Form>

			{/* Global notification live region. Render this permanently at the end of the document */}
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4">
					{actionData != null && !actionData.ok && <ErrorNotification />}
				</div>
			</div>
		</>
	);
}
