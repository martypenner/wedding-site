import React from 'react';

type Props = {
	title: string;
	description: string;
	hasGap?: boolean;
} & (
	| {
			children: React.ReactNode;
	  }
	| {
			smallDeviceBlocks: React.ReactNode[];
			largeDeviceBlocks: {
				left: React.ReactNode;
				right: React.ReactNode;
			}[];
	  }
);

export default function InfoLayout({
	title,
	description,
	// Union types in props, bah
	// @ts-expect-error
	children,
	// @ts-expect-error
	smallDeviceBlocks,
	// @ts-expect-error
	largeDeviceBlocks,
	hasGap = false,
}: Props) {
	return (
		<>
			<div className="border-t border-black" />

			<div className="relative mb-16 pt-4">
				<div className="accent-top-left pointer-events-none absolute top-0 left-0 h-150 w-1/2 bg-contain bg-left-top bg-no-repeat" />
				<div className="accent-top-right pointer-events-none absolute top-0 right-0 h-150 w-1/2 bg-contain bg-right-top bg-no-repeat" />

				<div className="mx-auto max-w-xl md:max-w-5xl">
					<h2 className="text-gray mx-auto mb-8 p-8 text-center text-5xl uppercase md:mt-9 md:text-6xl">
						{title}
					</h2>

					<div className="border-b border-black">
						<p className="mx-auto mb-16 max-w-lg px-4 text-center font-cardo">
							{description}
						</p>
					</div>

					{children ?? (
						<React.Fragment>
							{/* Smaller devices */}
							<div className="divide-y divide-black md:hidden">
								{smallDeviceBlocks.map((block: React.ReactNode) => (
									<div key={Math.random()} className="mb-16">
										{block}
									</div>
								))}
							</div>

							<div
								className={`hidden flex-col items-stretch justify-between md:flex ${
									hasGap ? 'gap-16' : ''
								}`}
							>
								{/* Larger devices */}
								{largeDeviceBlocks.map(
									(
										block: {
											left: React.ReactNode;
											right: React.ReactNode;
										},
										index: number
									) => {
										const isFirst = index === 0;

										return (
											<div
												key={Math.random()}
												className={`grid grid-flow-col grid-cols-2 items-center divide-x divide-black ${
													isFirst ? 'mt-9' : ''
												}`}
											>
												<div className="py-16 pr-8">{block.left}</div>
												<div className="py-16 pl-16 text-center font-cardo">
													{block.right}
												</div>
											</div>
										);
									}
								)}
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</>
	);
}
