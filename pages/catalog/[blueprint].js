import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import useAuth from '../../src/auth/authContext';
import styles from '../../styles/item.module.css'
import globalStyles from '../../styles/global.module.css'
import Image from 'next/image';
// import sample_images from '../../public/images.js'
import { motion, AnimatePresence, useCycle } from 'framer-motion';

export default function CatalogItem({ item }) {
    const [unique, setUnique] = useState([]);
    const [variants, setVariants] = useState([]);
    const NUM_IMAGES = item.image_urls.length;
    const indices = Array.from({ length: NUM_IMAGES-1 }, (value, index) => index + 1);
    const [currentIndex, setCurrentIndex] = useCycle(...indices);

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
            <h1 className={globalStyles.title}>{item.name}</h1>

            <div className={styles.carousel}>
                <button onClick={() => setCurrentIndex(idx => idx + 1)} className={`${styles.next} ${styles.button}`}>Next</button>
                <button onClick={() => setCurrentIndex(idx => idx - 1)} className={`${styles.prev} ${styles.button}`}>Prev</button>

                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
                    <AnimatePresence>
                        {
                            item.image_urls.map((image, index) => {
                                return (
                                    <motion.img
                                        key={index}
                                        src={image}
                                        alt="product-image"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ display: index === currentIndex ? 'block' : 'none' }}
                                    />
                                )
                            })
                        }
                    </AnimatePresence>
                </motion.div>
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