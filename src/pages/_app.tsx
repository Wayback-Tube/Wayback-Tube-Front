import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WayBack Tube</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
