import { useContext } from 'react';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/create.module.css';
import creationContext from '../src/context/creationContext';
import Link from 'next/link';
import Image from 'next/image';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useAuth from '../src/auth/authContext';

export default function Create() {
    const { image, product, addImage } = useContext(creationContext);
    const functions = getFunctions();
    const { user } = useAuth();
    const img_size = 300;

    async function generateMockup() {
        const generateMockup = httpsCallable(functions, 'create_product');
        await generateMockup({
            image: image.url, 
            blueprint_id: product.blueprint_id,
            variant_id: product.variant_id,
            printer_id: product.printer_id,
            token: user.accessToken            
        })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'

    return (
        <div className={globalStyles.main}>
            <h1>Create</h1>
            <div className={styles.boxes}>
                <div className={`${styles.leftBox} ${styles.box}`}>
                    {/* if image, show image else "Add an Image" with a button */}
                    {image ? <Image src={image} alt='image' width={img_size} height={img_size} /> : (
                        <div>
                            {/* <Link href="/design">Add an Image</Link> */}
                            <button onClick={() => addImage(IMG)}>Add an Image</button>
                        </div>
                    )}
                </div>
                <div>&#43;</div>
                <div className={`${styles.rightBox} ${styles.box}`}>
                    {/* if product, show product else "Add a Product" with a button */}
                    {
                        product ? (
                            <div className={styles.productBox}>
                                <Image src={product.image} alt='product' width={img_size} height={img_size} />
                                <p className={styles.name}>{product.name}</p>
                            </div>
                        ) : (
                            <Link href="/catalog">Add a Product</Link>
                        )
                    }
                </div>
            </div>
            <button className={styles.button} onClick={() => console.log(image, product)}>Log Items</button>
            <button className={styles.button} onClick={generateMockup}>Generate Mockup</button>
        </div>
    )
}