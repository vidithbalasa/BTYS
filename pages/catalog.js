import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import globalStyles from '../styles/global.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Catalog() {
    const [catalog, setCatalog] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        setCatalog({});
        async function getCatalog() {
            const db = getFirestore();
            const catalogRef = collection(db, 'printify_products');
            // Each page should have 20 products, so we skip the first 20*(page-1) products
            const catalog = await getDocs(catalogRef, { limit: 20, offset: 20 * (page - 1) });
            // create a product object for each product and stick it in the catalog
            catalog.forEach((doc) => {
                setCatalog((catalog) => ({
                    ...catalog,
                    [doc.id]: doc.data(),
                }));
            })
        }
        getCatalog();
    }, [page]);

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>Catalog</h1>
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
                            />
                        </a>
                    </Link>
                ))
            }
        </main>
    )
}