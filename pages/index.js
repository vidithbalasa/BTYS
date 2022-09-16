import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
// import link from 'next/link';
import Link from 'next/link';

export default function Home(props) {
  // hold state for prompt input
  const [prompt, setPrompt] = useState('')


  return (
    <div className={styles.container}>
      <Head>
        <title>Better Than You Society</title>
        <meta name="AI Powered Stickers" content="AI Powered Stickers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {props.isStatic ? (
            <div>
              <h1>Better Than You Society</h1>
              <p>An AI Powered Stickers Platform.</p>
            </div>
          ) : (
            <h1>Not Working</h1>
          )}
        </div>

        {/* Stable AI Prediction Bar */}
        <div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Link href={`/login`}>Login page</Link>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        
      </footer> */}
    </div>
  )
}

// add Home to root of html
export async function getStaticProps() {
  return { props: { isStatic: true } }
}