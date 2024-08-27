// src/pages/_app.js

import '../styles/globals.css';  // Import global styles
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo_s.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
