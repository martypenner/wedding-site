import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => ({
	title: 'Home — Marty Penner and Meaghan Jones',
});

export default function Home() {
	return (
		<>
			<div className="hero-image relative flex h-52 items-end justify-center border-t border-b border-black bg-cover bg-center md:h-176">
				<div className="hero-accent-top-left absolute top-0 left-0 h-72 w-3/4 bg-contain bg-no-repeat"></div>
				<div className="hero-accent-bottom-left absolute left-0 h-150 w-1/4 bg-contain bg-no-repeat"></div>
				<div className="hero-accent-bottom-right absolute right-0 h-150 w-1/4 bg-contain bg-no-repeat"></div>

				<div className="hidden text-white md:block">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-12 w-12"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>

			<h2 className="text-gray mx-auto mt-4 mb-14 max-w-xs p-8 text-center font-cardo text-5xl font-extrabold normal-case italic md:mt-9 md:max-w-2xl md:text-7xl">
				Celebrate with us!
			</h2>

			<div className="relative py-14 text-center">
				<div className="page-accent-bottom-right absolute right-0 bottom-0 h-125 w-1/2 bg-contain bg-right-bottom bg-no-repeat"></div>

				<div className="isolate">
					<div className="mb-24 text-4xl md:text-5xl">
						<h2 className="mb-3 uppercase">
							<div className="mb-1">Marty</div>
							<div>Penner</div>
						</h2>

						<div className="mb-3 font-cardo text-3xl italic">and</div>

						<h2 className="uppercase">
							<div className="mb-1">Meaghan</div>
							<div>Jones</div>
						</h2>
					</div>

					{/* small devices */}
					<div className="mx-8 mb-24 flex flex-col items-center justify-between gap-24 text-center text-3xl md:hidden">
						<div className="w-full">
							<div className="mb-3 font-cardo italic">in</div>

							<h2 className="block uppercase md:flex">
								<div className="mb-1 md:mb-0">Parry Sound</div>
								<div>Ontario</div>
							</h2>
						</div>

						<div className="w-full md:w-1/3">
							<div className="mb-3 font-cardo italic">on</div>

							<h2 className="block uppercase md:flex">
								<div className="mb-1 md:mb-0">October 15</div>
								<div>2022</div>
							</h2>
						</div>
					</div>

					{/* larger devices */}
					<div className="mb-24 hidden flex-row items-center justify-between px-16 text-center text-4xl md:flex">
						<div className="w-1/3">
							<div className="mb-3 font-cardo italic">in</div>

							<h2 className="flex justify-center uppercase">
								Parry Sound, Ontario
							</h2>
						</div>

						<div className="w-1/3">
							<div className="mb-3 font-cardo italic">on</div>

							<h2 className="flex justify-center uppercase">
								October 15, 2022
							</h2>
						</div>
					</div>
				</div>
			</div>

			<div className="bottom-hero-image h-52 overflow-hidden border-t border-black bg-cover bg-center md:h-176" />
		</>
	);
}
