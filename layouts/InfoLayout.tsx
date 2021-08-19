import React from 'react';
import BaseLayout from './BaseLayout';

type Props = {
  title: string;
  description: string;
  smallDeviceBlocks: React.ReactNode[];
  largeDeviceBlocks: {
    left: React.ReactNode;
    right: React.ReactNode;
  }[];
};

export default function InfoLayout({
  title,
  description,
  smallDeviceBlocks,
  largeDeviceBlocks,
}: Props) {
  return (
    <BaseLayout title={title}>
      <div className="border-t border-black" />

      <div className="relative pt-4 mb-16">
        <div className="accent-top-left absolute top-0 left-0 w-1/2 bg-left-top h-150 bg-contain bg-no-repeat pointer-events-none" />
        <div className="accent-top-right absolute top-0 right-0 w-1/2 bg-right-top h-150 bg-contain bg-no-repeat pointer-events-none" />

        <div className="mx-auto max-w-sm md:max-w-4xl">
          <h2 className="font-light text-5xl md:text-6xl text-gray text-center tracking-wider uppercase mx-auto md:mt-9 mb-8 p-8">
            {title}
          </h2>

          <div className="border-b border-black">
            <p className="font-cardo text-xl text-center tracking-wide max-w-lg mx-auto mb-16 px-4">
              {description}
            </p>
          </div>

          {/* Smaller devices */}
          <div className="md:hidden">
            {smallDeviceBlocks.map((block, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={Math.random()}
                  className={`${isFirst ? 'mb-16' : 'border-t border-black'}`}
                >
                  {block}
                </div>
              );
            })}
          </div>

          {/* Larger devices */}
          {largeDeviceBlocks.map((block, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={Math.random()}
                className={`hidden md:flex items-center justify-between ${
                  isFirst ? 'mt-9' : ''
                }`}
              >
                {isFirst ? (
                  <React.Fragment>
                    <div className="w-1/2 pt-16 pr-8">{block.left}</div>
                    <div className="w-1/2 pt-16 pl-16 border-l border-black font-cardo text-xl text-center tracking-wide">
                      {block.right}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="w-1/2 pr-8 py-32">{block.left}</div>
                    <div className="w-1/2 pl-16 py-32 border-l border-black font-cardo text-xl text-center tracking-wide">
                      {block.right}
                    </div>
                  </React.Fragment>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </BaseLayout>
  );
}
