import '../styles/globals.css';
import React from 'react';
import PageWithLayoutType from '../types/pageWithLayout';
import { AppProvider } from '../contexts/AppContext';

type AppLayoutProps = {
  Component: PageWithLayoutType,
  pageProps: any
}

function MyApp({Component, pageProps}: AppLayoutProps) {
  const Layout = Component.layout || ((children) => <>{children}</>);

  return (
    <Layout>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Layout>
  )
}

export default MyApp;