import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, limit, startAt, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/catalog.module.css';

export default function Catalog() {
    const [catalog, setCatalog] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        setCatalog({});
        async function getCatalog() {
            const db = getFirestore();
            const catalogQuery = query(
                collection(db, 'printify_products'),
                orderBy('name'),
                limit(20),
                startAt((page - 1) * 20)
            );
            const catalog = await getDocs(catalogQuery);
            // Get the "url" field from each document and add it to the images array
            catalog.forEach((doc) => {
                // Map each image id to its data
                setCatalog((catalog) => ({
                    ...catalog,
                    [doc.id]: doc.data(),
                }));
            });
        }
        getCatalog();
    }, [page]);

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>Catalog</h1>
            <button onClick={() => setPage(currPage => currPage + 1)}>Next page</button>
            {page > 1 && <button onClick={() => setPage(currPage => currPage - 1)}>Previous page</button>}
            <p>Current Page: {page}</p>
            <button onClick={() => console.log(catalog)}>Log catalog</button>
            <div className={styles.imageBox}>
                {
                    // Show each product with a link to /catalog/[id]
                    Object.keys(catalog).map((id) => (
                        <Link href={`/catalog/${id}`} key={id}>
                            <a>
                                <Image
                                    src={catalog[id].image_urls[0]}
                                    alt={catalog[id].name}
                                    width={512}
                                    height={512}
                                    className={styles.image}
                                />
                            </a>
                        </Link>
                    ))
                }
            </div>
        </main>
    )
}