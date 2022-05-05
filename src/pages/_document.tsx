import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Exo+2:wght@100;300;400;700&family=Josefin+Sans:ital,wght@0,300;0,400;1,500&family=Open+Sans&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />
          {/* swiper cdn styles */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/swiper@8/swiper-bundle.min.css"
          />
          <script
            async
            src="https://unpkg.com/swiper@8/swiper-bundle.min.js"
          ></script>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
