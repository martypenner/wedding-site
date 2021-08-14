import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import usInGreenhouse from '../public/us-smiling-in-greenhouse.jpg';
import usInWinter from '../public/us-in-winter.jpg';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home — Marty Penner and Meaghan Jones</title>
      </Head>

      {/* todo: full height page for background image */}
      <div className="background bg-contain bg-center">
        <header className="m-2 md:m-0 p-0 md:p-5 pb-0">
          <div className="hidden md:flex mb-6 tracking-wider font-light">
            <h2 className="font-cardo text-sm italic ml-8 lg:ml-0 mr-10">
              October 15, 2021
            </h2>
            <h3 className="font-cardo text-sm italic">Parry Sound, Ontario</h3>
          </div>

          <h1 className="text-xl md:text-5xl text-center font-extralight tracking-widest uppercase m-0 md:mb-4">
            <Link href="/">
              <a>Marty & Meaghan</a>
            </Link>
          </h1>
        </header>

        <div className="hero-image h-52 md:h-176 relative flex justify-center items-end bg-center bg-cover border-t border-b">
          <div className="hero-accent-top-left absolute top-0 left-0 w-3/4 h-72 bg-no-repeat bg-contain"></div>
          <div className="hero-accent-bottom-left absolute left-0 w-1/4 h-150 bg-no-repeat bg-contain"></div>
          <div className="hero-accent-bottom-right absolute right-0 w-1/4 h-150 bg-no-repeat bg-contain"></div>

          <div className="hidden md:block text-white">
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

        <h2 className="font-cardo italic font-extrabold text-5xl md:text-7xl text-gray text-center tracking-wider normal-case mx-auto mt-4 md:mt-9 mb-14 p-8 max-w-xs md:max-w-2xl">
          Celebrate with us!
        </h2>

        <div className="relative py-14 text-center">
          <div className="page-accent-bottom-right absolute right-0 bottom-0 w-1/2 h-125 bg-no-repeat bg-contain bg-right-bottom"></div>

          <div className="isolate">
            <div className="mb-24 text-4xl md:text-5xl">
              <h2 className="font-light uppercase mb-3">
                <div className="mb-1">Marty</div>
                <div>Penner</div>
              </h2>

              <div className="font-cardo text-3xl italic mb-3">and</div>

              <h2 className="font-light uppercase">
                <div className="mb-1">Meaghan</div>
                <div>Jones</div>
              </h2>
            </div>

            {/* small devices */}
            <div className="flex md:hidden flex-col justify-between items-center mb-24 mx-8 gap-24 text-3xl text-center">
              <div className="w-full">
                <div className="font-cardo italic mb-3">in</div>

                <h2 className="block md:flex font-light uppercase">
                  <div className="mb-1 md:mb-0">Parry Sound</div>
                  <div>Ontario</div>
                </h2>
              </div>

              <div className="w-full md:w-1/3">
                <div className="font-cardo italic mb-3">on</div>

                <h2 className="block md:flex font-light uppercase">
                  <div className="mb-1 md:mb-0">October 15</div>
                  <div>2021</div>
                </h2>
              </div>
            </div>

            {/* larger devices */}
            <div className="hidden md:flex flex-row justify-between items-center mb-24 px-16 text-4xl text-center">
              <div className="w-1/3">
                <div className="font-cardo italic mb-3">in</div>

                <h2 className="flex justify-center font-light uppercase">
                  Parry Sound, Ontario
                </h2>
              </div>

              <div className="w-1/3">
                <div className="font-cardo italic mb-3">on</div>

                <h2 className="flex justify-center font-light uppercase">
                  October 15, 2021
                </h2>
              </div>
            </div>

            <h3 className="mx-8 text-5xl font-extralight uppercase">
              More info coming soon
            </h3>
          </div>
        </div>

        <div className="bottom-hero-image h-52 md:h-176 overflow-hidden bg-center bg-cover" />
      </div>
    </React.Fragment>
  );
}
