import React from 'react'
import Head from 'next/head'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/MainFooter'

const MainLayout = ({ children }) => (
    <div id="MainLayout" className="bg-yellow-50">
        <Head>
            <title>Zoom Family Feud</title>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap" rel="stylesheet"/>
        </Head>

        <MainHeader />
        
        <main className="min-h-90vh">
            {children}
        </main>

        <MainFooter />
    </div>
);

export default MainLayout;