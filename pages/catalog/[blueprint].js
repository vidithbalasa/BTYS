import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import useAuth from '../../src/auth/authContext';
import styles from '../../styles/item.module.css'
import globalStyles from '../../styles/global.module.css'
import Image from 'next/image';

export default function CatalogItem({ item }) {
    const [unique, setUnique] = useState([]);
    const [variants, setVariants] = useState([]);
    // const [currImage, setCurrImage] = useState(0);
    // const [item, setItem] = useState({});

    const router = useRouter();
    const { blueprint } = router.query;
    
    const functions = getFunctions();
    const { user } = useAuth();

    useEffect(() => {
        const getInfo = async () => {
            // get function from us-central1
            const getBlueprintInfo = httpsCallable(functions, 'printify_product_info');
            await getBlueprintInfo({ blueprint_id: blueprint, token: user.accessToken })
                .then((result) => {
                    console.log(result.data)
                    const { unique, variants } = result.data;
                    setUnique(unique);
                    setVariants(variants);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getInfo();
    }, [blueprint]);

    return (
        <main className={globalStyles.main}>
            <h1>{item.name}</h1>
            <div className={styles.display}>
                <div className={styles.images}>
                    {/* <button className={styles.scrollLeft} onClick={e => setCurrImage(img => img - 1)}>&lt;</button> */}
                    <div className={styles.slider_container}>
                        {
                            item.image_urls.map((url, i) => {
                                return (
                                    <Image src={url} alt={item.name} width={250} height={250} key={i} className={styles.slider_image} />
                                )
                            })
                        }
                    </div>
                    {/* <button className={styles.scrollRight} onClick={e => setCurrImage(img => img + 1)}>&gt;</button> */}
                </div>
            </div>
        </main>
    )
}

export async function getStaticPaths() {
    // Get a reference to the firestore instance
    const firestore = getFirestore();
  
    // Query the 'printify_products' collection to get a list of all product names
    const productCollection = collection(firestore, 'printify_products')
    const productNames = await getDocs(productCollection)

    // Map the product names to a list of paths
    const paths = productNames.docs.map(doc => ({
        params: { blueprint: doc.id }
    }))
  
    // Return a list of paths with the dynamic IDs set to the product names
    return {
      paths: paths,
      fallback: false
    }
}

// Get the info for the product from firestore
export async function getStaticProps({ params }) {
    // Get a reference to the firestore instance
    const firestore = getFirestore();
  
    // Get the document from the 'printify_products' collection with the name matching the dynamic ID
    const item_doc = doc(firestore, 'printify_products', params.blueprint);
    const item = await getDoc(item_doc);

  
    // Return the product data as props
    return {
      props: {
        item: item.data()
      }
    }
}