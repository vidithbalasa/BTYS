import { withProtected } from "../src/auth/route"
import styles from '../styles/cart.module.css';
import { getFirestore, collection, getDocs, document, getDoc } from "firebase/firestore";
import useAuth from "../src/auth/authContext";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import sampleImages from '../public/sampleImages';
import CartDisplay from "../components/cartDisplay";
import { updateCartItem, getCartSessionInfo } from "../src/utils/cartService";
import createSession from "../src/utils/checkout";
import useMediaQuery from "../src/hooks/mediaQuery";
import globalStyles from '../styles/global.module.css';

function Cart() {
    const { user } = useAuth();
    const smallScreen = useMediaQuery('(max-width: 600px)');
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const imageSize = smallScreen ? 150 : 192;
    const firestore = getFirestore();
    const [checkoutLoad, setCheckoutLoad] = useState(false);
    const updateItem = async (itemId, update) => {
        await updateCartItem(firestore, user, itemId, update);
    }
    const checkoutCart = async () => {
        setCheckoutLoad(true);
        const { line_items, metadata }  = await getCartSessionInfo(firestore, user);
        await createSession(firestore, user, line_items, { metadata }, setCheckoutLoad)
    }
    
    // const samplePrompts = [
    //     'lorem ipsum dolor sit amet. consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam',
    //     'consectetur adipiscing elit',
    //     'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    //     'ut enim ad minim veniam',
    // ]
    // const [loading, setLoading] = useState(false);
    // // const cartItems = [{url: sampleImages[0], prompt: samplePrompts[0]}]
    // const cartItems = []
    // for (let i = 0; i < 10; i++) {
    //     cartItems.push({url: sampleImages[i], prompt: samplePrompts[i % 4], quantity: 1, size: '2x2', id: i})
    // }

    useEffect(() => {
        if (!user) return;
        const getCartItems = async () => {
            const cartRef = collection(firestore, 'users', user.uid, 'cart');
            const cartItems = await getDocs(cartRef);
            const cartItemsArray = [];
            for (const itemDoc of cartItems.docs) {
                const data = itemDoc.data();
                const { quantity, size } = data;
                const imageRef = data.image;
                const imageData = await getDoc(imageRef);
                const { url, prompt } = imageData.data();
                cartItemsArray.push({url, prompt, quantity, size, id: itemDoc.id});
            }
            return cartItemsArray
        }
        getCartItems()
            .then(items => {
                setCartItems(items);
                setLoading(false);
            })
    }, [user])

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
                    <button className={styles.checkoutButton} onClick={checkoutCart}>Check Out</button>
                </div>
                <div className={styles.imagesBox}>
                    {
                        cartItems.map((item, i) => {
                            return (
                                <CartDisplay 
                                    item={item} updateItem={updateItem}
                                    key={i} imageSize={imageSize} smallScreen={smallScreen}
                                />
                            )
                        })
                    }
                </div>
            </main>
            {checkoutLoad && <div className={globalStyles.checkoutLoader}><Loader /></div>}
        </>
    )
}

export default withProtected(Cart);