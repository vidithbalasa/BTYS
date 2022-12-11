import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
// import link from 'next/link';
import Link from 'next/link';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Better Than You Society</title>
        <meta name="Better Than You Society" content="AI Powered Stickers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
            <h1>Better Than You Society</h1>
            <p>An AI Powered Stickers Platform.</p>
            <p>Current Build: {process.env.NODE_ENV}</p>
          </div>
        </div>
      </main>
    </div>
  )
}