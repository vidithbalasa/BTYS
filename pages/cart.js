import { withProtected } from "../src/auth/route"
import styles from '../styles/cart.module.css';
import { getFirestore, collection, getDocs, document, getDoc } from "firebase/firestore";
import useAuth from "../src/auth/authContext";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import sampleImages from '../public/sampleImages';
import CartDisplay from "../components/cartDisplay";

function Cart() {
    const { user } = useAuth();
    // const [loading, setLoading] = useState(true);
    // const [cartItems, setCartItems] = useState([]);
    const imageSize = 192;
    // const firestore = getFirestore();
    
    const samplePrompts = [
        'lorem ipsum dolor sit amet. consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam',
        'consectetur adipiscing elit',
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        'ut enim ad minim veniam',
    ]
    const [loading, setLoading] = useState(false);
    const cartItems = [{url: sampleImages[0], prompt: samplePrompts[0]}]

    

    // useEffect(() => {
    //     const getCartItems = async () => {
    //         // Get all items from cart
    //         const firestore = getFirestore();
    //         const cartRef = collection(firestore, 'users', user.uid, 'cart');
    //         const cartItems = await getDocs(cartRef);
    //         const cartItemsArray = [];
    //         for (const imageDoc of cartItems.docs) {
    //             const data = imageDoc.data();
    //             const { quantity, size } = data;
    //             const imageRef = data.image;
    //             const imageData = await getDoc(imageRef);
    //             const { url, prompt } = imageData.data();
    //             cartItemsArray.push({url, prompt, quantity, size});
    //         }
    //         return cartItemsArray
    //     }
    //     getCartItems()
    //         .then(items => {
    //             setCartItems(items);
    //             setLoading(false);
    //         })
    // }, [user])

    if (loading) return <div className={styles.loader}><Loader /></div>

    return (
        <>
            <main className={styles.main}>
                <div className={styles.banner}>
                    <h3 className={styles.banner}>$8 Stickers</h3>
                    <h3 className={styles.banner}>Free Shipping (US Only)</h3>
                </div>
                <div className={styles.checkout}>
                    <h3 className={styles.price}>Total: {`$${cartItems.length * 8}.00`}</h3>
                    <button className={styles.checkoutButton}>Check Out</button>
                </div>
                <div className={styles.imagesBox}>
                    {
                        cartItems.map((item, i) => {
                            return (
                                <CartDisplay url={item.url} prompt={item.prompt} key={i} imageSize={imageSize} />
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export default withProtected(Cart);