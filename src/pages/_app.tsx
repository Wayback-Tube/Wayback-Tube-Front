import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import "tailwind.css";
import TopBar from "components/TopBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>WayBack Tube</title>
        <meta
          name="description"
          content="The best place for archiving videos"
        />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <TopBar/>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
