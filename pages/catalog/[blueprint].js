import { useEffect, useState, useContext } from 'react';
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import useAuth from '../../src/auth/authContext';
import styles from '../../styles/item.module.css'
import globalStyles from '../../styles/global.module.css'
import Image from 'next/image';
import { useCycle } from 'framer-motion';
import Carousel from '../../components/carousel';
import ItemSelection from '../../components/itemSelection';
import creationContext from '../../src/context/creationContext';

// import sample_images from '../../public/images.js'


export default function CatalogItem({ item, variants }) {
    // const [unique, setUnique] = useState(item.unique);
    // const [variants, setVariants] = useState();
    
    // const [unique, setUnique] = useState(mockUnique);
    // const [variants, setVariants] = useState(mockVariants);

    const images = item.image_urls;
    // const images = sample_images;

    /* PROD */

    const [selected, setSelected] = useState({})
    const [validVariants, setValidVariants] = useState([]);
    // const [stockIsLoading, setStockIsLoading] = useState(true);
    // const [provider, setProvider] = useState('');
    // const [outOfStock, setOutOfStock] = useState(false);

    const NUM_IMAGES = images.length;
    const indices = Array.from({ length: NUM_IMAGES }, (value, index) => index);
    const [currentIndex, setCurrentIndex] = useCycle(...indices);

    const router = useRouter();
    const { blueprint } = router.query;
    
    // const functions = getFunctions();
    // const { user } = useAuth();

    const { addProduct } = useContext(creationContext);

    // useEffect(() => {
    //     const getInfo = async () => {
    //         // get function from us-central1
    //         const getBlueprintInfo = httpsCallable(functions, 'printify_product_info');
    //         await getBlueprintInfo({ blueprint_id: blueprint, token: user.accessToken })
    //             .then((result) => {
    //                 console.log(result.data)
    //                 const { unique, variants, provider } = result.data;
    //                 if (!provider) {
    //                     setOutOfStock(true);
    //                     return;
    //                 }
    //                 setUnique(unique);
    //                 setVariants(variants);
    //                 setValidVariants(variants);
    //                 setProvider(provider);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    //     getInfo();
    //     setStockIsLoading(false);
    // }, [blueprint]);

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
        // if (validVariants.length !== 1) { return }
        const variant = validVariants[0];
        const mockup = {
            blueprint_id: blueprint,
            variant_id: variant.id,
            printer_id: provider,
            // variant: variant,
            image: images[0],
            name: item.name,
        }
        addProduct(mockup);
        router.push('/create');
    }

    return (
        <main className={globalStyles.main}>
            {/* <h1 className={globalStyles.title}>{item.name}</h1> */}
            <div className={styles.box}>
                <div className={styles.carousel}>
                    <Carousel currentIndex={currentIndex} images={images} />
                    <div className={styles.indicators}>
                        <button onClick={() => setCurrentIndex(idx => idx - 1)} className={`${styles.prev} ${styles.button}`}>&#8678;</button>
                        {currentIndex}
                        <button onClick={() => setCurrentIndex(idx => idx + 1)} className={`${styles.next} ${styles.button}`}>&#8680;</button>
                    </div>
                </div>
                {
                    !item.unique ? <p>Item is out of stock</p> : (
                        <ItemSelection unique={item.unique} selected={selected} validVariants={validVariants} selectItem={selectItem} unselectItem={unselectItem} createMockup={createMockup} />
                    )
                }
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
    // Get all the data from each document in the 'printers' collection
    const printers_docs = collection(item_doc, 'printers');
    const printers = await getDocs(printers_docs);
    // For each doc, get all the varaints
    let variants = [];
    printers.forEach(printer => {
        let printer_variants = printer.data().variants;
        // Variants = {[variant_id]: {'color': 'red', 'size': 'small', 'price': 10}, ...}
        // Turn it into : [{variant_id: '...', 'size': 'small', 'color': 'red', 'price': 10, 'printer_id': '5'}, ...]
        formatted_variants = Object.keys(printer_variants).map(variant_id => {
            return {
                ...printer_variants[variant_id],
                variant_id: variant_id,
                printer_id: printer.id
            }
        });
        variants = variants.concat(formatted_variants);
    });

  
    // Return the product data as props
    return {
      props: {
        item: item.data(),
        variants: variants
      }
    }
}