import { Dialog, Transition } from '@headlessui/react';
import { UsersIcon } from '@heroicons/react/outline';
import { Fragment } from 'react';

type Props = {
	onCloseDialog: () => void;
};

export default function SuccessDialog({ onCloseDialog }: Props) {
	return (
		<Transition.Root show as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={onCloseDialog}
			>
				<div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:h-screen sm:align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
							<div>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<UsersIcon
										className="h-6 w-6 text-green-600"
										aria-hidden="true"
									/>
								</div>
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="mb-4 font-medium">
										You're registered!
									</Dialog.Title>
									<div>
										<p>
											If you need to change your answer at any time, you can
											fill in your name on the RSVP page like you did when you
											first got here. After July 30, 2022, you will have to
											contact us directly.
										</p>
									</div>
								</div>
							</div>
							<div className="mt-5 flex justify-center sm:mt-6">
								<button
									type="button"
									className="button--small"
									onClick={onCloseDialog}
								>
									Go back to site
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
