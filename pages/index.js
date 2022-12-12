import Head from 'next/head'
import styles from '../styles/Home.module.css'
import globalStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
// import link from 'next/link';
import Link from 'next/link';
import HomeBackdrop from '../components/homeBackdrop';
import Image from 'next/image';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Loader from '../components/loader';

function Home(props) {

  return (
    <>
      <Head>
        <title>Better Than You Society</title>
        <meta name="Better Than You Society" content="AI Powered Stickers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeBackdrop images={props.images}>
        <main className={styles.main}>
          <Image src='/Logo.png.webp' alt="Better Than You Society Logo" width={250} height={250} />
          {/* Button that sends you to design page */}
          <Link href="/design">
            <button className={styles.button}>Click Here</button>
          </Link>
        </main>
      </HomeBackdrop>
    </>
  )
}

Home.displayName = 'Home';

export default Home;

export async function getStaticProps() {
  const db = getFirestore();
  const colRef = collection(db, 'images')
  const docs = await getDocs(colRef)
  const images = []
  docs.forEach((doc) => {
    let data = doc.data()
    images.push({url: data.url, prompt: data.prompt})
  })

  return {
    props: {
      images
    }
  }
}