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
import { withProtected } from '../../src/auth/route';

// import sample_images from '../../public/images.js'
// const mockItem = {
//     name: 'test item',
//     unique: {
//         'color': ["Black", "White", "Red"],
//         // 'color': ["Black", "White", "Red", "Yellow", "Orange", "Sky Blue", "Ghost Purple", "Cheeto Orange"],
//         'size': ["S", "M", "L"]
//     },
//     image_urls: sample_images
// }
// const mockVariants = [
//     {variant_id: 1, color: 'Black', size: 'S', printer_id: 2},
//     {variant_id: 3, color: 'Black', size: 'L', printer_id: 2},
//     {variant_id: 4, color: 'White', size: 'S', printer_id: 2},
//     {variant_id: 5, color: 'White', size: 'M', printer_id: 2},
//     {variant_id: 8, color: 'Red', size: 'M', printer_id: 2},
//     // {variant_id: 9, color: 'Orange', size: 'L', printer_id: 2},
//     // {variant_id: 10, color: 'Yellow', size: 'S', printer_id: 2},
//     // {variant_id: 11, color: 'Sky Blue', size: 'M', printer_id: 2},
//     // {variant_id: 12, color: 'Ghost Purple', size: 'L', printer_id: 2},
//     // {variant_id: 13, color: 'Cheeto Orange', size: 'S', printer_id: 2},
// ]


function CatalogItem({ item, variants }) {
// function CatalogItem() {
    // const [item, setUnique] = useState(mockItem);
    // const [variants, setVariants] = useState(mockVariants);

    /* PROD */

    const [selected, setSelected] = useState({})
    const [validVariants, setValidVariants] = useState([]);

    const NUM_IMAGES = item.image_urls.length;
    const indices = Array.from({ length: NUM_IMAGES }, (value, index) => index);
    const [currentIndex, setCurrentIndex] = useCycle(...indices);

    const router = useRouter();
    const { blueprint } = router.query;
    
    const { addProduct } = useContext(creationContext);

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
            variant_id: variant.variant_id,
            printer_id: variant.printer_id,
            // variant: variant,
            image: item.image_urls[0],
            name: item.name,
        }
        addProduct(mockup);
        router.push('/create');
    }

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>{item.name}</h1>
            <div className={styles.box}>
                <div className={styles.carousel}>
                    <Carousel currentIndex={currentIndex} images={item.image_urls} />
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

export default withProtected(CatalogItem);

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
    const printers_docs = collection(item_doc, 'print_providers');
    const printers = await getDocs(printers_docs);
    // Turn printers into a format that can be used by the CatalogItem component
    const variants = printers.docs.map(printer => {
        const printer_variants = printer.data().variants;
        for (const variant_id of Object.keys(printer_variants)) {
            const variant = printer_variants[variant_id];
            variant['variant_id'] = variant_id;
            variant['printer_id'] = printer.id;
            return variant;
        }
    })

    // Return the product data as props
    return {
      props: {
        item: item.data(),
        variants: variants
      }
    }
}