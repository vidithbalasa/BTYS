import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/catalog.module.css';
import { searchClient } from '../src/config/firebase.config';
import { InstantSearch, SearchBox, Hits, Pagination, Highlight } from 'react-instantsearch-dom';

export default function Catalog() {
    const [page, setPage] = useState(1);

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
            <InstantSearch searchClient={searchClient} indexName={'catalog'}>
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </main>
    )
}

function Hit({ hit }) {
    return (
        <Link href={`/catalog/${hit.objectID}`} className={styles.hitBox} >
            <a>
                <Image
                    src={hit.image_urls[0]}
                    alt={hit.name}
                    width={256}
                    height={256}
                    className={styles.image}
                />
                <Highlight attribute="name" hit={hit} />
            </a>
        </Link>
    )
}