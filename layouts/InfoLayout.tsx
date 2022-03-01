import React from 'react';
import BaseLayout from './BaseLayout';

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
		<BaseLayout title={title}>
			<div className="border-t border-black" />

			<div className="relative pt-4 mb-16">
				<div className="accent-top-left absolute top-0 left-0 w-1/2 bg-left-top h-150 bg-contain bg-no-repeat pointer-events-none" />
				<div className="accent-top-right absolute top-0 right-0 w-1/2 bg-right-top h-150 bg-contain bg-no-repeat pointer-events-none" />

				<div className="mx-auto max-w-xl md:max-w-5xl">
					<h2 className="text-5xl md:text-6xl text-gray text-center uppercase mx-auto md:mt-9 mb-8 p-8">
						{title}
					</h2>

					<div className="border-b border-black">
						<p className="font-cardo text-center max-w-lg mx-auto mb-16 px-4">
							{description}
						</p>
					</div>

					{children ?? (
						<React.Fragment>
							{/* Smaller devices */}
							<div className="md:hidden divide-y divide-black">
								{smallDeviceBlocks.map((block) => (
									<div key={Math.random()} className="mb-16">
										{block}
									</div>
								))}
							</div>

							<div
								className={`hidden md:flex flex-col items-stretch justify-between ${
									hasGap ? 'gap-16' : ''
								}`}
							>
								{/* Larger devices */}
								{largeDeviceBlocks.map((block, index) => {
									const isFirst = index === 0;

									return (
										<div
											key={Math.random()}
											className={`grid grid-flow-col grid-cols-2 items-center divide-x divide-black ${
												isFirst ? 'mt-9' : ''
											}`}
										>
											<div className="py-16 pr-8">{block.left}</div>
											<div className="py-16 pl-16 font-cardo text-center">
												{block.right}
											</div>
										</div>
									);
								})}
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</BaseLayout>
	);
}
