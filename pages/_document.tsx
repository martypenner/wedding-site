import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-CA">
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Cardo:400,400i,700|Montserrat:200,400&display=swap"
					/>
				</Head>

				<body className="antialiased text-xl font-light has-background bg-contain bg-center">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
