import { useContext, useState } from 'react';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/create.module.css';
import creationContext from '../src/context/creationContext';
import Link from 'next/link';
import Image from 'next/image';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useAuth from '../src/auth/authContext';
import { withProtected } from '../src/auth/route';
// import StripeService from '../src/stripe/stripeService';
import stripeContext from '../src/stripe/stripeContext';
import { useRouter } from 'next/router';

function Create() {
    const { image, product, resetCreation } = useContext(creationContext);
    const [mockup, setMockup] = useState({});
    const functions = getFunctions();
    const { user } = useAuth();
    const img_size = 300;
    const { stripe } = useContext(stripeContext);
    const router = useRouter();

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
                setMockup({
                    image: result.data.image,
                    product_id: result.data.product_id,
                    price: result.data.price
                })
                // resetCreation();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const buyNow = async () => {
        router.push('/checkout')
    }

    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'

    if (mockup) {
        return (
            <div className={globalStyles.main}>
                <h1>Mockup</h1>
                <Image src={mockup.image} alt='mockup' width={img_size} height={img_size} />
                <div className={styles.buttons}>
                    <button className={`${styles.cartButton} ${styles.mockupButton}`}>Add to Cart</button>
                    <button className={`${styles.buyNowButton} ${styles.mockupButton}`} onClick={buyNow}>call printify</button>
                </div>
            </div>
        )
    }

    return (
        <div className={globalStyles.main}>
            <h1>Create</h1>
            <div className={styles.boxes}>
                <div className={`${styles.leftBox} ${styles.box}`}>
                    {image ? <Image src={image.url} alt='image' width={img_size} height={img_size} /> : (
                            <Link href="/design">Add an Image</Link>
                    )}
                </div>
                <div>&#43;</div>
                <div className={`${styles.rightBox} ${styles.box}`}>
                    {product ? (
                        <div className={styles.productBox}>
                            <Image src={product.image} alt='product' width={img_size} height={img_size} />
                            <p className={styles.name}>{product.name}</p>
                        </div>
                        ) : <Link href="/catalog">Add a Product</Link>
                    }
                </div>
            </div>
            <button className={styles.button} onClick={generateMockup}>Generate Mockup</button>
        </div>
    )
}

export default withProtected(Create);