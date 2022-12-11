import Head from 'next/head'
import styles from '../styles/Home.module.css'
import globalStyles from '../styles/global.module.css';
import React, { useState } from 'react';
// import link from 'next/link';
import Link from 'next/link';
import Loader from '../components/loader';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Better Than You Society</title>
        <meta name="Better Than You Society" content="AI Powered Stickers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={globalStyles.main}>
        <h1>Better Than You Society</h1>
        <p>An AI Powered Stickers Platform.</p>
        <Loader />
      </main>
    </>
  )
}