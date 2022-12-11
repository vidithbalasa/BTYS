import { useContext, useState } from 'react';
import globalStyles from '../styles/global.module.css';
import styles from '../styles/create.module.css';
import creationContext from '../src/context/creationContext';
import Link from 'next/link';
import Image from 'next/image';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import useAuth from '../src/auth/authContext';
import { withProtected } from '../src/auth/route';
// import StripeService from '../src/stripe/stripeService';
import { useRouter } from 'next/router';
import CheckoutButton from '../components/checkoutButton';

function Create() {
    const { image, product, resetCreation } = useContext(creationContext);
    // const [mockup, setMockup] = useState({});
    const [mockup, setMockup] = useState({
        image: 'https://images-api.printify.com/mockup/639560ca41f1a9570e0d94d6/73217/16992/d4b47b918e9b4a039a9ae89df31c76d8.jpg',
        product_id: '639560ca41f1a9570e0d94d6',
        price: 1999,
        printer_id: '39',
        variant_id: '86180',
        blueprint_id: '314',
        prompt: 'fake prompt'
    });
    const functions = getFunctions();
    const { user } = useAuth();
    const img_size = 300;
    const db = getFirestore();

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
                    price: result.data.price,
                    printer_id: product.printer_id,
                    variant_id: product.variant_id,
                    blueprint_id: product.blueprint_id,
                    name: product.name,
                    prompt: image.prompt
                })
                resetCreation();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Function to create line items
    const generateSessionData = async () => {
        // Get price & name from mockup
        const { price, blueprint_id, printer_id, variant_id, prompt } = mockup;
        // Get shipping info from firestore
        const doc_ref = doc(db, 'printify_products', blueprint_id, 'print_providers', printer_id)
        const docSnap = await getDoc(doc_ref);
        // Get shipping price from field: us_shipping_info -> {first_item: number, additional_item: number, ship_time: number}
        const { first_item, ship_time } = docSnap.data().us_shipping_info;
        // // Create line item
        // const line_items = [{
        //     quantity: 1,
        //     price_data: {
        //         currency: 'usd',
        //         product_data: {
        //             images: [image.url],
        //             metadata: { blueprint_id, printer_id, variant_id, prompt },
        //             name: `Custom ${mockup.name} - ${prompt}`
        //         },
        //         unit_amount: price
        //     }
        // }]
        const line_items = [{
            quantity: 1,
            price_data: {currency: 'usd', unit_amount: price, product_data: {name: `Custom ${mockup.name} - ${prompt}`}}
        }]
        const shipping_rate_data = {
                type: 'fixed-amount',
                fixed_amount: {amount: first_item, currency: 'usd'},
                display_name: 'US Shipping',
                delivery_estimate: {minimum: {unit: 'business_day', value: ship_time}, maximum: {unit: 'business_day', value: null}},
        }
        return {
            line_items: line_items,
            // shipping_options: [shipping_rate_data],
            // shipping_address_collection: {allowed_countries: ['US']},
        }
    }

    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'

    if (Object.keys(mockup).length > 0) {
        return (
            <div className={globalStyles.main}>
                <h1>Mockup</h1>
                <Image src={mockup.image} alt='mockup' width={img_size} height={img_size} />
                <div className={styles.buttons}>
                    <button className={`${styles.cartButton} ${styles.mockupButton}`}>Add to Cart</button>
                    <CheckoutButton
                        buttonStyles={`${styles.buyNowButton} ${styles.mockupButton}`} 
                        disabled={() => {!product || !image}}
                        sessionData={generateSessionData()}
                        text={'Buy Now'}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={globalStyles.main}>
            <h1>Create</h1>
            <div className={styles.boxes}>
                <div className={`${styles.leftBox} ${styles.box}`}>
                    {image && image.url ? <Image src={image.url} alt='image' width={img_size} height={img_size} /> : (
                            <Link href="/design">Add an Image</Link>
                    )}
                </div>
                <div>&#43;</div>
                <div className={`${styles.rightBox} ${styles.box}`}>
                    {product && product.image ? (
                        <div className={styles.productBox}>
                            <Image src={product.image} alt='product' width={img_size} height={img_size} />
                            <p className={styles.name}>{product.name}</p>
                        </div>
                        ) : <Link href="/catalog">Add a Product</Link>
                    }
                </div>
            </div>
            <button className={styles.button} onClick={generateMockup} disabled={!product || !image}>Generate Mockup</button>
        </div>
    )
}

export default withProtected(Create);