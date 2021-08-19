import Link from 'next/link';
import React from 'react';

export default function SiteHeader() {
  return (
    <header className="m-2 md:m-0 p-0 md:p-5 pb-0">
      <div className="hidden md:flex mb-6">
        <h2 className="font-cardo text-sm italic ml-8 lg:ml-0 mr-10">
          October 15, 2022
        </h2>
        <h3 className="font-cardo text-sm italic">Parry Sound, Ontario</h3>
      </div>

      <h1 className="text-2xl md:text-5xl text-center uppercase m-0 md:mb-4">
        <Link href="/">
          <a>Marty & Meaghan</a>
        </Link>
      </h1>
    </header>
  );
}
