import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "tailwind.css";
import TopBar from "components/TopBar";
import "@fontsource/material-icons";
import "@fontsource/be-vietnam-pro/300.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fontsource/be-vietnam-pro/900.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <TopBar />
        <main className="mt-16 pt-6 pb-24 overflow-scroll h-[calc(100vh-3rem)]">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
}

export default MyApp;
