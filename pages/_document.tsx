import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Cardo:400,400i,700|Montserrat:200,400&display=swap"
					/>

					{/* <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps-api-v3/api/js/42/4/common.js"
          ></script>
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps-api-v3/api/js/42/4/util.js"
          ></script> */}

					{/* <script src="https://use.typekit.net/yuq4sen.js" async></script> */}

					{/* <link
            href="https://d1tntvpcrzvon2.cloudfront.net/vwassets/new/main.11e53fbf.css"
            rel="stylesheet"
          /> */}
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
