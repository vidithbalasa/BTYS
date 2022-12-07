import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import useAuth from '../../src/auth/authContext';
import styles from '../../styles/item.module.css'
import globalStyles from '../../styles/global.module.css'
import Image from 'next/image';
// import sample_images from '../../public/images.js'
import { useCycle } from 'framer-motion';
import Carousel from '../../components/carousel';
import ItemSelection from '../../components/itemSelection';
import creationContext from '../../src/context/creationContext';

export default function CatalogItem({ item }) {
    const [unique, setUnique] = useState([]);
    const [variants, setVariants] = useState([]);
    
    // const [unique, setUnique] = useState(mockUnique);
    // const [variants, setVariants] = useState(mockVariants);

    const images = item.image_urls;

    /* PROD */

    const [selected, setSelected] = useState({})
    const [validVariants, setValidVariants] = useState(variants);

    const NUM_IMAGES = images.length;
    const indices = Array.from({ length: NUM_IMAGES-1 }, (value, index) => index + 1);
    const [currentIndex, setCurrentIndex] = useCycle(...indices);

    const router = useRouter();
    const { blueprint } = router.query;
    
    const functions = getFunctions();
    const { user } = useAuth();

    const { addProduct } = useContext(creationContext);

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

    useEffect(() => {
        // Go through each variant and put the ones that match selections in validVariants
        let newValidVariants = [];
        variants.forEach(variant => {
            let valid = true;
            for (let key in selected) {
                if (selected[key] && selected[key] !== variant[key]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                newValidVariants.push(variant);
            }
        })
        setValidVariants(newValidVariants);
    }, [selected])

    const unselectItem = (key) => {
        // reset filtered variants
        setValidVariants(variants);
        const newSelected = {...selected};
        delete newSelected[key];
        setSelected(newSelected);
    }

    const selectItem = (key,val) => setSelected({...selected, [key]:val})

    const createMockup = () => {
        if (validVariants.length !== 1) { return }
        const variant = validVariants[0];
        const mockup = {
            blueprint_id: blueprint,
            variant_id: variant.id,
            variant: variant,
            image: images[0],
        }
        addProduct(mockup);
    }

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>{item.name}</h1>
            <div className={styles.box}>
                <div className={styles.carousel}>
                    <Carousel currentIndex={currentIndex} images={images} />
                    <div className={styles.indicators}>
                        <button onClick={() => setCurrentIndex(idx => idx - 1)} className={`${styles.prev} ${styles.button}`}>&#8678;</button>
                        <button onClick={() => setCurrentIndex(idx => idx + 1)} className={`${styles.next} ${styles.button}`}>&#8680;</button>
                    </div>
                </div>
                <ItemSelection unique={unique} selected={selected} validVariants={validVariants} selectItem={selectItem} unselectItem={unselectItem} createMockup={createMockup} />
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