import { withProtected } from "../src/auth/route"
import styles from '../styles/cart.module.css';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import useAuth from "../src/auth/authContext";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

function Cart() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCartItems = async () => {
            // Get all items from cart
            const firestore = getFirestore();
            const cartRef = collection(firestore, 'users', user.uid, 'cart');
            const cartItems = await getDocs(cartRef);
            const cartItemsArray = cartItems.docs.map(doc => doc.data());
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
                <h1 className={styles.title}>Cart</h1>
                {/* button to console log cart items */}
                <button onClick={() => console.log(cartItems)}>Log Cart Items</button>
            </main>
        </>
    )
}

export default withProtected(Cart);