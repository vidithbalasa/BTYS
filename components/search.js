import { InstantSearch, SearchBox, Hits, Pagination, Highlight } from 'react-instantsearch-dom';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/catalog.module.css';

export default function Search(props) {
    return (
        <InstantSearch {...props}>
            <SearchBox />
            <Hits hitComponent={Hit} />
        </InstantSearch>
    )
}

function Hit({ hit }) {
    return (
        <Link href={`/catalog/${hit.objectID}`}>
            <a>
                <div className={styles.hitBox}>
                    <Image
                        src={hit.image_urls[0]}
                        alt={hit.name}
                        width={256}
                        height={256}
                        className={styles.image}
                    />
                    <Highlight attribute="name" hit={hit} className={styles.productName} />
                </div>
            </a>
        </Link>
    )
}