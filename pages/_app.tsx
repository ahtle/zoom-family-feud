import '../styles/globals.css'
import React from 'react'
import PageWithLayoutType from '../types/pageWithLayout'

type AppLayoutProps = {
  Component: PageWithLayoutType
  pageProps: any
}

function MyApp({Component, pageProps}: AppLayoutProps) {
  const Layout = Component.layout || ((children) => <>{children}</>);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;