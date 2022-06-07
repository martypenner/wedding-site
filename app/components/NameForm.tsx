import { Form, useLoaderData, useTransition } from '@remix-run/react';
import React, { useState } from 'react';

export default function NameForm() {
	const loaderData = useLoaderData<404 | any>();
	const transition = useTransition();

	const [name, setName] = useState('');
	const [hasNameChanged, setHasNameChanged] = useState(false);

	const nameNotFound = loaderData === 404;

	return (
		<>
			<Form
				method="get"
				replace={nameNotFound}
				className="mx-4 mt-8 text-center"
			>
				<label htmlFor="rsvp-name-lookup" className="mb-8 block font-cardo">
					Please enter your first and last name to unlock your RSVP form. If
					you're responding for you and a guest (or your family), you'll be able
					to RSVP for your entire group.
				</label>
				<div className="my-4 text-left">
					<input
						name="name"
						className={
							// Make the placeholder smaller than the filled text, and adjust
							// padding to avoid a visual jump
							name.length === 0 ? 'px-3 py-3 text-sm' : 'px-3 py-2 text-lg'
						}
						type="text"
						id="rsvp-name-lookup"
						placeholder="Ex. Sarah Fortune (not The Fortune Family or Dr. &amp; Mr. Fortune)"
						required
						value={name}
						onChange={(event) => {
							setName(event.target.value);
							// Whenever name is changed in any way, we can begin validating.
							setHasNameChanged(true);
						}}
					/>

					<span className="text-lg font-normal text-red-700">
						{hasNameChanged && name.trim().length === 0 ? (
							'Required'
						) : nameNotFound && transition.state === 'idle' ? (
							`Hmm, we can't seem to find that name! Type it in right next time (spelling it how we spelled it on your envelope is a good bet).`
						) : (
							<span>&nbsp;</span>
						)}
					</span>
				</div>

				<button type="submit" className="mx-auto">
					{transition.state === 'submitting' ? (
						<React.Fragment>
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
							Fetching your RSVP…
						</React.Fragment>
					) : (
						<span>Continue</span>
					)}
				</button>
			</Form>
		</>
	);
}
