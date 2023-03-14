import { SessionProvider } from "next-auth/react"
import 'styles/globals.css'
import Navbar from 'components/Navbar'
import Head from 'next/head'

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Notably Bad</title>
      </Head>
      <Navbar/>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}