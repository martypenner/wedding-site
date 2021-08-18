import Head from 'next/head';
import React from 'react';
import SiteHeader from '../components/SiteHeader';

export default function BaseLayout({ title, children }) {
  return (
    <React.Fragment>
      <Head>
        <title>{title} — Marty Penner and Meaghan Jones</title>
      </Head>

      <SiteHeader />

      {children}
    </React.Fragment>
  );
}
