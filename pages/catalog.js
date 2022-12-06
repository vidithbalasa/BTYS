import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, limit, startAt, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/catalog.module.css';
import { searchClient } from '../src/config/firebase.config';
import { InstantSearch, SearchBox, Hits, Pagination } from 'react-instantsearch-dom';
import '../styles/algolia.css'

export default function Catalog() {
    const [page, setPage] = useState(1);

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>Catalog</h1>
            <InstantSearch searchClient={searchClient} indexName={'catalog'}>
                <div className={styles.searchField}>
                    <SearchBox />
                    <Hits hitComponent={Hit} />
                </div>
            </InstantSearch>
        </main>
    )
}

function Hit({ hit }) {
    return (
        <div className={styles.hitBox}>
            <Image
                src={hit.image_urls[0]}
                alt={hit.name}
                width={256}
                height={256}
                className={styles.image}
            />
            <p className={styles.productName}>{hit.name}</p>
        </div>
    )
}