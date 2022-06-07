import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import stylesheetUrl from '~/styles/tailwind.css';
import SiteHeader from './components/SiteHeader';

if (process.env.NODE_ENV === 'development' && typeof document !== 'undefined') {
	require('@xstate/inspect').inspect({
		iframe: false,
	});
}

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: stylesheetUrl,
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css?family=Cardo:400,400i,700|Montserrat:200,400&display=swap',
		},
	];
};

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Marty Penner and Meaghan Jones',
	viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="has-background bg-contain bg-center text-xl font-light antialiased">
				<SiteHeader />

				<div className="mt-12 md:mt-0">
					<Outlet />
				</div>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
