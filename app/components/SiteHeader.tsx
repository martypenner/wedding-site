import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import { Link, NavLink } from '@remix-run/react';
import React from 'react';
import { classNames } from '~/utils';
import ClientOnlyPortal from './ClientOnlyPortal';

const navigationItems = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Schedule',
		href: '/schedule',
	},
	// {
	//   name: 'Travel',
	//   href: '/travel',
	// },
	// {
	//   name: 'Photos',
	//   href: '/photos',
	// },
	{
		name: 'Faqs',
		href: '/faqs',
	},
	{
		name: 'RSVP',
		href: '/rsvp',
	},
];

export default function SiteHeader() {
	const [menuIsVisible, setMenuIsVisible] = React.useState(false);

	return (
		<header className="fixed top-0 z-10 w-full bg-white p-2 md:static md:bg-transparent md:p-5">
			<div className="flex items-center md:hidden">
				<button
					type="button"
					className="m-0 border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
					onClick={() => {
						setMenuIsVisible(true);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<span className="sr-only">Open menu</span>
				</button>

				<Transition.Root show={menuIsVisible} as={React.Fragment}>
					<ClientOnlyPortal selector="body">
						<Dialog
							as="div"
							className="fixed inset-0 z-10 h-screen overflow-y-auto text-center"
							onClose={setMenuIsVisible}
						>
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-95 transition-opacity" />
							</Transition.Child>

							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<div className="h-screen transform overflow-hidden p-8 text-left transition-all">
									<div className="absolute top-0 left-0 pt-14 pl-4">
										<button
											type="button"
											className="m-0 border-0 bg-transparent p-2 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
											onClick={() => setMenuIsVisible(false)}
										>
											<span className="sr-only">Close</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>

									<nav className="mx-8 mt-3" aria-label="Site menu">
										{navigationItems.map((item) => (
											<NavLink
												key={item.name}
												to={item.href}
												className={({ isActive }) =>
													classNames(
														isActive ? 'text-gold' : undefined,
														'flex items-center justify-center px-3 py-2 text-3xl font-medium uppercase hover:underline'
													)
												}
												onClick={() => setMenuIsVisible(false)}
											>
												<span className="truncate">{item.name}</span>
											</NavLink>
										))}
									</nav>
								</div>
							</Transition.Child>
						</Dialog>
					</ClientOnlyPortal>
				</Transition.Root>

				<h1 className="m-0 flex-1 text-center text-2xl uppercase">
					<Link to="/">Marty & Meaghan</Link>
				</h1>
			</div>

			<div className="mb-6 hidden md:flex">
				<h2 className="ml-8 mr-10 font-cardo text-sm italic lg:ml-0">
					October 15, 2022
				</h2>
				<h3 className="font-cardo text-sm italic">Parry Sound, Ontario</h3>
			</div>

			<div className="hidden md:block">
				<h1 className="mb-4 text-center text-5xl uppercase">
					<Link to="/">Marty & Meaghan</Link>
				</h1>

				<nav
					className="mx-8 flex items-center justify-center gap-10 text-xs font-normal uppercase tracking-wider"
					aria-label="Site menu"
				>
					{navigationItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							className={({ isActive }) =>
								classNames(
									isActive ? 'text-gold' : '',
									'flex items-center justify-center hover:underline'
								)
							}
						>
							{item.name}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}
